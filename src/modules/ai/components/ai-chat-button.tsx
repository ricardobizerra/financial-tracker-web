'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ChatMutation } from '../graphql/ai-queries';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const EXAMPLE_QUESTIONS = [
  'Quanto gastei esse mês?',
  'Qual meu saldo atual?',
  'Como posso economizar mais?',
  'Resuma minhas finanças',
];

export function AiChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sendMessage, { loading }] = useMutation(ChatMutation);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const { data } = await sendMessage({
        variables: { message: text },
      });

      if (data?.chat?.message) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.chat.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Tente novamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg transition-all duration-300 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl"
        size="icon"
      >
        <Sparkles className="h-6 w-6 text-white" />
        <span className="sr-only">Abrir assistente financeiro</span>
      </Button>

      {/* Chat Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <SheetTitle className="text-white">
                  Assistente Financeiro
                </SheetTitle>
                <SheetDescription className="text-white/80">
                  Pergunte sobre suas finanças
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30">
                  <Sparkles className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Olá! Como posso ajudar?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pergunte sobre seus gastos, receitas ou peça dicas
                  financeiras.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'flex-row-reverse' : '',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                      message.role === 'user'
                        ? 'bg-primary'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600',
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      message.role === 'user'
                        ? 'rounded-tr-none bg-primary text-primary-foreground'
                        : 'rounded-tl-none bg-muted',
                    )}
                  >
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    ) : (
                      <div className="prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions + Input Area */}
          <div className="border-t bg-background p-4">
            {/* Quick Suggestions - Always visible */}
            <div className="mb-3 flex flex-wrap gap-2">
              {EXAMPLE_QUESTIONS.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  className="h-auto px-2.5 py-1 text-xs"
                  onClick={() => handleSend(question)}
                >
                  {question}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua pergunta..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                size="icon"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
