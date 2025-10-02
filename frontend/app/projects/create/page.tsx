'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Plus, 
  Sparkles, 
  CheckCircle,
  Code,
  Users,
  Target
} from 'lucide-react';

export default function CreateProject() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: ''
  });

  const categories = [
    'Веб-разработка',
    'Мобильная разработка', 
    'Дизайн',
    'Маркетинг',
    'Образование',
    'Игры',
    'Искусственный интеллект',
    'Блокчейн'
  ];

  const levels = [
    { value: 'beginner', label: 'Начинающий' },
    { value: 'middle', label: 'Средний' },
    { value: 'expert', label: 'Эксперт' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Необходимо войти в систему для создания проекта');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Имитируем создание проекта
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      
      // Перенаправляем через 3 секунды
      setTimeout(() => {
        router.push('/projects');
      }, 3000);
    } catch (error) {
      setError('Произошла ошибка при создании проекта');
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
            Для создания проекта необходимо войти в систему
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Проект создан!</h1>
          <p className="text-muted-foreground mb-6">
            Ваш проект "{formData.title}" успешно создан и опубликован. 
            Теперь участники могут подавать заявки на участие.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button>
                Все проекты
              </Button>
            </Link>
            <Button variant="outline" onClick={() => {
              setIsSuccess(false);
              setFormData({ title: '', description: '', category: '', level: '' });
            }}>
              Создать еще один
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
            <Link href="/projects">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Назад к проектам</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Plus className="w-6 h-6 text-primary" />
                  Создать новый проект
                </CardTitle>
                <CardDescription>
                  Опишите ваш проект, чтобы привлечь талантливых участников
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
                    <Label htmlFor="title">Название проекта *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Краткое и понятное название проекта"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание проекта *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Подробно опишите цели проекта, используемые технологии, требования к участникам..."
                      className="min-h-[200px] resize-none"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {formData.description.length}/1000 символов
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level">Уровень сложности *</Label>
                      <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите уровень" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      * Обязательные поля
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.title.trim() || !formData.description.trim() || !formData.category || !formData.level}
                      className="px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Создание...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Создать проект
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
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Советы для создания проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Code className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Четкое описание</h4>
                    <p className="text-muted-foreground">Опишите цели, технологии и ожидаемый результат</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Требования к участникам</h4>
                    <p className="text-muted-foreground">Укажите необходимые навыки и уровень опыта</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Временные рамки</h4>
                    <p className="text-muted-foreground">Оцените продолжительность проекта</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Что происходит дальше?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">1</div>
                  <span>Проект публикуется в общем списке</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">2</div>
                  <span>Участники подают заявки</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">3</div>
                  <span>Вы рассматриваете кандидатов</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">4</div>
                  <span>Формируете команду и начинаете работу</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}