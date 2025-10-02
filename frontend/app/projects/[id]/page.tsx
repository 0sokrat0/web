'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/Logo';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Users, 
  Clock, 
  Code, 
  MessageCircle,
  Star,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProject(Number(params.id));
    }
  }, [params.id]);

  const loadProject = async (id: number) => {
    try {
      setIsLoading(true);
      // Используем моковые данные из API
      const projects = await api.getProjects();
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setIsLoading(false);
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
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Сохранено' : 'Сохранить'}
              </Button>
          </div>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getLevelVariant(project.level)}>
                        {getLevelText(project.level)}
                      </Badge>
                      <Badge variant="outline">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Создан {new Date(project.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.members?.length || 0} участников</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Обновлен {new Date(project.updated_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Детали проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Описание</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
      </div>

                <Separator />
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Технологии</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.category === 'Веб-разработка' && (
                      <>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">PostgreSQL</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                      </>
                    )}
                    {project.category === 'Мобильная разработка' && (
                      <>
                        <Badge variant="outline">React Native</Badge>
                        <Badge variant="outline">Firebase</Badge>
                        <Badge variant="outline">JavaScript</Badge>
                      </>
                    )}
                    {project.category === 'Игры' && (
                      <>
                        <Badge variant="outline">Unity</Badge>
                        <Badge variant="outline">C#</Badge>
                        <Badge variant="outline">2D Art</Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Команда проекта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={project.owner.avatar} alt={project.owner.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {project.owner.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        <Link href={`/profile/${project.owner.id}`} className="hover:text-primary">
                          {project.owner.name}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground">Автор проекта</p>
                      <p className="text-sm text-muted-foreground mt-1">{project.owner.bio}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.owner.skills.split(', ').map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {project.members && project.members.length > 0 && (
                    <>
                      <Separator />
                      <h4 className="font-medium text-foreground">Участники команды</h4>
                      {project.members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.user.avatar} alt={member.user.name} />
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              {member.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground">{member.user.name}</h5>
                            <p className="text-sm text-muted-foreground">{member.user.bio}</p>
                          </div>
                          <Badge variant="outline">
                            {member.status === 'accepted' ? 'Участник' : 'Ожидает'}
                          </Badge>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/projects/${project.id}/apply`}>
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Подать заявку
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Добавить в избранное
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Просмотры</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Заявки</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 20) + 5}</span>
                    </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Рейтинг</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Projects */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Похожие проекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm text-foreground mb-1">E-commerce платформа</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Создаем современную платформу для онлайн-торговли...
                    </p>
                    </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm text-foreground mb-1">Мобильное приложение</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      Разрабатываем приложение для заказа и доставки еды...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}