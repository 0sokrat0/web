'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Code, 
  FileText,
  CheckCircle,
  Sparkles,
  Upload
} from 'lucide-react';

export default function EditProfile() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        skills: user.skills || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Имитируем обновление профиля
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Обновляем пользователя в контексте
      updateUser({
        ...user,
        ...formData
      });
      
      setIsSuccess(true);
      
      // Перенаправляем через 2 секунды
      setTimeout(() => {
        router.push(`/profile/${user.id}`);
      }, 2000);
    } catch (error) {
      setError('Произошла ошибка при сохранении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Войдите в систему</h1>
          <p className="text-muted-foreground mb-6">
            Для редактирования профиля необходимо войти в систему
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Профиль обновлен!</h1>
          <p className="text-muted-foreground mb-6">
            Ваш профиль успешно сохранен и обновлен
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/profile/${user.id}`}>
              <Button>
                Посмотреть профиль
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Продолжить редактирование
            </Button>
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
            <Link href={`/profile/${user.id}`}>
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад к профилю</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  Редактировать профиль
                </CardTitle>
                <CardDescription>
                  Обновите информацию о себе, чтобы другие пользователи могли лучше вас узнать
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Avatar Section */}
                  <div className="space-y-4">
                    <Label>Аватар</Label>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={formData.avatar} alt={formData.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                          {formData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Input
                          name="avatar"
                          value={formData.avatar}
                          onChange={handleChange}
                          placeholder="URL аватара"
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          Вставьте ссылку на изображение для аватара
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="pl-10"
                          placeholder="Ваше имя"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Навыки</Label>
                    <div className="relative">
                      <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="React, Node.js, TypeScript, Python..."
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Перечислите ваши навыки через запятую
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="pl-10 min-h-[120px] resize-none"
                        placeholder="Расскажите о себе, своем опыте и интересах..."
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.bio.length}/500 символов
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      * Обязательные поля
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.name.trim() || !formData.email.trim()}
                      className="px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Сохранить изменения
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Советы для профиля</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Четкое имя</h4>
                    <p className="text-muted-foreground">Используйте настоящее имя для доверия</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Code className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Актуальные навыки</h4>
                    <p className="text-muted-foreground">Укажите технологии, которыми владеете</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Интересная биография</h4>
                    <p className="text-muted-foreground">Расскажите о своем опыте и целях</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Что видят другие?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">1</div>
                  <span>Ваше имя и аватар</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">2</div>
                  <span>Список навыков</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">3</div>
                  <span>Биографию</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">4</div>
                  <span>Ваши проекты</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
