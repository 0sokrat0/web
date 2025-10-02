'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Code, 
  Star,
  MessageCircle,
  Settings,
  Edit,
  Sparkles
} from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  skills: string;
  bio: string;
  avatar?: string;
  created_at: string;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    created_at: string;
  }>;
  applications: Array<{
    id: number;
    project_id: number;
    project_title: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
  }>;
}

export default function UserProfile() {
  const params = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProfile(Number(params.id));
    }
  }, [params.id]);

  const loadProfile = async (id: number) => {
    try {
      setIsLoading(true);
      // Имитируем загрузку профиля
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Если это профиль текущего пользователя, используем данные из контекста
      if (currentUser && currentUser.id === id) {
        const userProfile: UserProfile = {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          skills: currentUser.skills,
          bio: currentUser.bio,
          avatar: currentUser.avatar || "",
          created_at: currentUser.created_at,
          projects: [
            {
              id: 1,
              title: "E-commerce платформа на React",
              description: "Современная платформа для онлайн-торговли",
              category: "Веб-разработка",
              level: "middle",
              created_at: "2024-01-15T10:00:00Z"
            },
            {
              id: 2,
              title: "Мобильное приложение для доставки",
              description: "Приложение для заказа и доставки еды",
              category: "Мобильная разработка",
              level: "middle",
              created_at: "2024-01-16T09:30:00Z"
            }
          ],
          applications: [
            {
              id: 1,
              project_id: 3,
              project_title: "AI-чатбот для поддержки клиентов",
              status: 'accepted',
              created_at: "2024-01-20T14:00:00Z"
            },
            {
              id: 2,
              project_id: 4,
              project_title: "Дизайн системы для стартапа",
              status: 'pending',
              created_at: "2024-01-21T10:30:00Z"
            }
          ]
        };
        setProfile(userProfile);
        setIsOwnProfile(true);
      } else {
        // Для других пользователей используем моковые данные
        const mockProfile: UserProfile = {
          id: id,
          name: id === 1 ? "Алексей Петров" : "Пользователь",
          email: id === 1 ? "alexey@example.com" : "user@example.com",
          skills: "React, Node.js, PostgreSQL, TypeScript, Next.js",
          bio: "Опытный full-stack разработчик с 5+ лет опыта. Специализируюсь на создании современных веб-приложений с использованием React и Node.js. Участвовал в разработке более 20 проектов различной сложности.",
          avatar: "",
          created_at: "2024-01-01T00:00:00Z",
          projects: [
            {
              id: 1,
              title: "E-commerce платформа на React",
              description: "Современная платформа для онлайн-торговли",
              category: "Веб-разработка",
              level: "middle",
              created_at: "2024-01-15T10:00:00Z"
            },
            {
              id: 2,
              title: "Мобильное приложение для доставки",
              description: "Приложение для заказа и доставки еды",
              category: "Мобильная разработка",
              level: "middle",
              created_at: "2024-01-16T09:30:00Z"
            }
          ],
          applications: [
            {
              id: 1,
              project_id: 3,
              project_title: "AI-чатбот для поддержки клиентов",
              status: 'accepted',
              created_at: "2024-01-20T14:00:00Z"
            },
            {
              id: 2,
              project_id: 4,
              project_title: "Дизайн системы для стартапа",
              status: 'pending',
              created_at: "2024-01-21T10:30:00Z"
            }
          ]
        };
        setProfile(mockProfile);
        setIsOwnProfile(false);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'Принят';
      case 'pending': return 'Ожидает';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Профиль не найден</h1>
          <p className="text-muted-foreground mb-6">Пользователь не существует или профиль недоступен</p>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/projects">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад к проектам</span>
              </Button>
            </Link>
            
            {isOwnProfile && (
              <Link href="/profile/edit">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-base">
                  {profile.bio}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>На сайте с {new Date(profile.created_at).toLocaleDateString('ru-RU')}</span>
            </div>

                <Separator />

            <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    Навыки
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(', ').map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
            </div>
          </div>

          {isOwnProfile && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Сообщения
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Настройки
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Проекты ({profile.projects.length})
                </CardTitle>
                <CardDescription>
                  {isOwnProfile ? 'Ваши проекты' : 'Проекты пользователя'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile.projects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Пока нет проектов</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.projects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">
                            <Link href={`/projects/${project.id}`} className="hover:text-primary">
                              {project.title}
                            </Link>
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Уровень: {project.level}</span>
                          <span>Создан: {new Date(project.created_at).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Applications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Заявки ({profile.applications.length})
                </CardTitle>
                <CardDescription>
                  {isOwnProfile ? 'Ваши заявки на участие в проектах' : 'Заявки пользователя'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile.applications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Пока нет заявок</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.applications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">
                            <Link href={`/projects/${application.project_id}`} className="hover:text-primary">
                              {application.project_title}
                            </Link>
                          </h4>
                          <Badge variant={getStatusVariant(application.status)}>
                            {getStatusText(application.status)}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Подана: {new Date(application.created_at).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}