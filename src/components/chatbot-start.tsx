"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { XMarkIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, TrashIcon, PaperClipIcon } from "@heroicons/react/24/solid";

// 메시지 타입 정의
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// 메시지 저장소 타입 정의
type MessageStore = {
  [key: string]: Message[];
};

// FAQ 옵션 정의
const FAQ_OPTIONS = [
  { id: 'cost', icon: '📌', text: '마케팅 서비스 비용이 궁금해요' },
  { id: 'strategy', icon: '🎯', text: '우리 회사에 맞는 마케팅 전략이 궁금해요' },
  { id: 'metrics', icon: '📊', text: '마케팅 성과는 어떻게 측정하나요?' },
  { id: 'social', icon: '📱', text: '소셜미디어 마케팅 서비스가 궁금해요' },
  { id: 'seo', icon: '📈', text: '검색엔진 최적화(SEO) 서비스가 궁금해요' },
  { id: 'other', icon: '❓', text: '다른 문의사항이 있어요' }
];

export function ChatbotStart() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageStore>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : {};
    }
    return {};
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  
  // 메시지가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // 컴포넌트 마운트 시 저장된 메시지가 있으면 FAQ 숨기기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages && Object.keys(JSON.parse(savedMessages)).length > 0 && currentChatId) {
        setShowFAQ(false);
      }
    }
  }, [currentChatId]);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // showForm이 false로 변경될 때 채팅 입력창에 포커스
  useEffect(() => {
    if (!showFAQ && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [showFAQ]);

  // FAQ 옵션 선택 처리
  const handleFAQSelect = async (option: typeof FAQ_OPTIONS[0]) => {
    setCurrentChatId(option.id);
    setShowFAQ(false);
    
    // 해당 FAQ에 대한 이전 대화가 없는 경우에만 새로운 대화 시작
    if (!messages[option.id] || messages[option.id].length === 0) {
      const userMessage: Message = {
        role: 'user',
        content: option.text
      };
      
      setMessages(prev => ({
        ...prev,
        [option.id]: [userMessage]
      }));

      setIsLoading(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [userMessage]
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || '오류가 발생했습니다.');
        }
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.text
        };

        setMessages(prev => ({
          ...prev,
          [option.id]: [...(prev[option.id] || []), assistantMessage]
        }));
      } catch (error) {
        console.error('API 오류:', error);
        const errorMessage: Message = {
          role: 'assistant',
          content: '죄송합니다. 잠시 후 다시 시도해주세요.'
        };
        
        setMessages(prev => ({
          ...prev,
          [option.id]: [...(prev[option.id] || []), errorMessage]
        }));
      }
      setIsLoading(false);
    }
  };

  // 채팅 시작 처리
  const handleChatStart = async (initialQuestion: string, chatId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: initialQuestion }]
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '오류가 발생했습니다.');
      }
      
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), {
          role: 'assistant',
          content: data.text
        }]
      }));
    } catch (error) {
      console.error('API 오류:', error);
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), {
          role: 'assistant',
          content: '죄송합니다. 잠시 후 다시 시도해주세요.'
        }]
      }));
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentChatId) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), userMessage]
    }));
    setInput("");
    setIsLoading(true);
    
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...(messages[currentChatId] || []), userMessage]
          }),
        });
        
        const data = await response.json();
        console.log('API 응답:', data);

        if (response.status === 429) {
          if (retryCount < maxRetries - 1) {
            retryCount++;
            await delay(1000 * retryCount);
            continue;
          }
        }

        if (!response.ok) {
          if (data.error && typeof data.error === 'object') {
            throw new Error(data.error.message || '알 수 없는 오류가 발생했습니다.');
          }
          throw new Error(data.error || `API 오류: ${response.status}`);
        }
        
        if (data.error) {
          throw new Error(typeof data.error === 'object' ? data.error.message : data.error);
        }
        
        setMessages(prev => ({
          ...prev,
          [currentChatId]: [...(prev[currentChatId] || []), {
            role: 'assistant',
            content: data.text
          }]
        }));
        break;
      } catch (error: any) {
        console.error('API 오류 상세:', error);
        if (retryCount === maxRetries - 1) {
          setMessages(prev => ({
            ...prev,
            [currentChatId]: [...(prev[currentChatId] || []), {
              role: 'assistant',
              content: '죄송합니다. 잠시 후 다시 시도해주세요.'
            }]
          }));
        }
        retryCount++;
        await delay(1000 * retryCount);
      }
    }
    setIsLoading(false);
  };

  const resetChat = () => {
    setShowFAQ(true);
    setMessages({});
    setInput("");
    setCurrentChatId(null);
    localStorage.removeItem('chatMessages');
  };

  const toggleChat = () => {
    if (isOpen) {
      resetChat(); // 채팅창을 닫을 때 대화 내용 초기화
    }
    setIsOpen(!isOpen);
  };

  const currentMessages = currentChatId ? messages[currentChatId] || [] : [];

  return (
    <>
      <Button
        color="white"
        size="lg"
        className="!fixed bottom-4 right-4 flex gap-1 px-3 py-2 items-center border border-[#5a25a8]/20 shadow-xl z-40 rounded-[25px]
        transition-all duration-300 group hover:bg-[#5a25a8] hover:border-[#5a25a8] hover:shadow-[5px_5px_15px_rgba(79,7,186,0.4)]"
        style={{boxShadow: '2px 3px 10px rgba(0,0,0,0.2)'}}
        onClick={toggleChat}
        placeholder=""
      >
        <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-[#5a25a8] transition-colors duration-300 group-hover:text-white" />
        <span className="text-[#4f07ba] font-bold transition-colors duration-300 group-hover:text-white">실시간 상담</span>
      </Button>

      {isOpen && (
        <div className="!fixed bottom-20 right-4 z-50">
          <Card className="w-[380px] h-[650px] flex flex-col overflow-hidden bg-white border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl">
            <div className="bg-white p-2 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center gap-2">
                {!showFAQ && currentMessages.length > 0 && (
                  <Button
                    variant="text"
                    color="black"
                    size="sm"
                    className="p-1 min-w-[28px] min-h-[28px] hover:bg-gray-100 active:bg-gray-200 transition-colors rounded-lg"
                    onClick={() => {
                      setShowFAQ(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </Button>
                )}
                <Typography variant="h6" color="black" className="font-medium text-base">
                  <span className="font-bold text-black">MaBle</span>
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="text"
                  color="black"
                  size="sm"
                  className="p-1.5 min-w-[30px] min-h-[30px] hover:bg-gray-100 active:bg-gray-200 transition-colors rounded-lg"
                  onClick={() => {
                    if (confirm("모든 대화 내용이 삭제됩니다. 계속하시겠습니까?")) {
                      resetChat();
                    }
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="text"
                  color="black"
                  size="sm"
                  className="p-1.5 min-w-[30px] min-h-[30px] hover:bg-gray-100 active:bg-gray-200 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <CardBody className="p-0 overflow-hidden flex flex-col flex-grow bg-white">
              {showFAQ ? (
                <div className="p-4 flex flex-col gap-3">
                  <Typography variant="h5" color="blue-gray" className="mt-6 mb-4 text-center">
                    무엇을 도와드릴까요?
                  </Typography>
                  {FAQ_OPTIONS.map((option, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      color="blue-gray"
                      className="flex items-center gap-2 py-3 px-4 normal-case text-left hover:bg-blue-50/50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/30 border border-white/20"
                      fullWidth
                      onClick={() => handleFAQSelect(option)}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm font-normal">{option.text}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-4 bg-white">
                    <div className="space-y-4">
                      {currentMessages.map((message, index) => (
                        <div key={index} className={`flex items-start mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                          {message.role !== 'user' && (
                            <div className="mr-2 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/30">M</div>
                            </div>
                          )}
                          <div className={`rounded-2xl p-3.5 max-w-[80%] shadow-sm ${
                            message.role === 'user' 
                              ? 'bg-[#7f65d6] text-white' 
                              : 'bg-white border border-gray-200 text-gray-800'
                          }`}>
                            <Typography
                              variant="paragraph"
                              className={`text-[15px] leading-relaxed ${
                                message.role === 'user'
                                  ? 'font-medium'
                                  : 'font-normal'
                              }`}
                            >
                              {message.content}
                            </Typography>
                          </div>
                          {message.role === 'user' && (
                            <div className="ml-2 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/30">
                                Q
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex items-start mb-4">
                          <div className="mr-2 flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/30">M</div>
                          </div>
                          <div className="bg-gradient-to-r from-white/60 to-white/50 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_8px_16px_rgba(0,0,0,0.08)] border border-white/30">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  <form 
                    onSubmit={handleSubmit} 
                    className="border-t border-white/20 px-3 py-3 flex gap-2 items-center bg-gradient-to-r from-white/60 to-white/50 backdrop-blur-md"
                  >
                    <div className="flex-grow relative">
                      <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        ref={chatInputRef}
                        className="w-full px-4 py-3 rounded-xl outline-none text-[15px] bg-white border border-gray-200 focus:border-[#4f07ba] focus:ring-1 focus:ring-[#4f07ba] transition-all placeholder-gray-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      color="blue"
                      className="p-3 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#4f07ba]/90 to-[#6410e3]/90 backdrop-blur-sm hover:from-[#4f07ba] hover:to-[#6410e3] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/20"
                      disabled={isLoading || !input.trim() || !currentChatId}
                    >
                      <PaperAirplaneIcon className="h-6 w-6" />
                    </Button>
                  </form>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export default ChatbotStart; 