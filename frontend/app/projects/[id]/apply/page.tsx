'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Project } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Clock, 
  User, 
  MessageCircle,
  Star,
  Sparkles
} from 'lucide-react';

export default function ApplyToProject() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [applicationText, setApplicationText] = useState('');

  useEffect(() => {
    if (params.id) {
      loadProject(Number(params.id));
    }
  }, [params.id]);

  const loadProject = async (id: number) => {
    try {
      setIsLoading(true);
      const projects = await api.getProjects();
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Необходимо войти в систему для подачи заявки');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Имитируем отправку заявки
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      
      // Перенаправляем через 3 секунды
      setTimeout(() => {
        router.push(`/projects/${params.id}`);
      }, 3000);
    } catch (error) {
      setError('Произошла ошибка при подаче заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Начинающий';
      case 'middle': return 'Средний';
      case 'expert': return 'Эксперт';
      default: return level;
    }
  };

  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'beginner': return 'default';
      case 'middle': return 'secondary';
      case 'expert': return 'destructive';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка проекта...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Проект не найден</h1>
          <p className="text-muted-foreground mb-6">Возможно, проект был удален или не существует</p>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к проектам
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Войдите в систему</h1>
          <p className="text-muted-foreground mb-6">
            Для подачи заявки на участие в проекте необходимо войти в систему
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="w-full sm:w-auto">
                Войти
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full sm:w-auto">
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Заявка отправлена!</h1>
          <p className="text-muted-foreground mb-6">
            Ваша заявка на участие в проекте "{project.title}" успешно отправлена. 
            Автор проекта рассмотрит её в ближайшее время.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/projects/${params.id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                К проекту
              </Button>
            </Link>
            <Link href="/projects">
              <Button>
                Все проекты
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/projects/${params.id}`}>
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад к проекту</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="w-6 h-6 text-primary" />
                  Подать заявку на участие
                </CardTitle>
                <CardDescription>
                  Расскажите о себе и своих навыках, чтобы автор проекта мог оценить вашу кандидатуру
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="application">Почему вы хотите участвовать в этом проекте?</Label>
                    <Textarea
                      id="application"
                      value={applicationText}
                      onChange={(e) => setApplicationText(e.target.value)}
                      placeholder="Расскажите о своем опыте, навыках и мотивации для участия в проекте..."
                      className="min-h-[200px] resize-none"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {applicationText.length}/1000 символов
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      Заявка будет отправлена автору проекта
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !applicationText.trim()}
                      className="px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Отправить заявку
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Информация о проекте</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={getLevelVariant(project.level)}>
                    {getLevelText(project.level)}
                  </Badge>
                  <Badge variant="outline">
                    {project.category}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Автор: {project.owner.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Создан: {new Date(project.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>Участников: {project.members?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Советы для заявки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Опишите свой опыт в данной области</span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Укажите, сколько времени можете уделить проекту</span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Расскажите о своих мотивациях</span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Приведите примеры своих работ</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
