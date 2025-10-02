import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Heart, 
  Award, 
  Globe, 
  Code, 
  Palette,
  MessageCircle,
  Shield,
  Zap
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            О Proj•Link
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Мы создаем будущее совместной работы, объединяя талантливых людей 
            <span className="text-primary font-medium"> для реализации амбициозных проектов</span>
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Наша миссия
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Соединяем таланты с возможностями
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Proj•Link — это платформа, которая разрушает барьеры между идеями и их реализацией. 
              Мы верим, что лучшие проекты создаются в команде единомышленников.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Инновации</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Поддерживаем самые смелые идеи и помогаем превратить их в реальные продукты
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Сообщество</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Создаем сильное сообщество профессионалов, готовых делиться знаниями и опытом
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Страсть</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Вдохновляем людей заниматься тем, что им действительно нравится
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Award className="w-3 h-3 mr-1" />
              Наши ценности
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Принципы, которыми мы руководствуемся
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Открытость</h3>
              <p className="text-sm text-muted-foreground">Прозрачность во всех процессах и решениях</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Качество</h3>
              <p className="text-sm text-muted-foreground">Высокие стандарты в каждом проекте</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Креативность</h3>
              <p className="text-sm text-muted-foreground">Поощряем нестандартные решения</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Сотрудничество</h3>
              <p className="text-sm text-muted-foreground">Командная работа превыше всего</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Возможности платформы
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Что делает Proj•Link особенным
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Безопасность</CardTitle>
                    <CardDescription>Защита данных и конфиденциальность</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы используем современные методы шифрования и следуем лучшим практикам 
                  безопасности для защиты ваших проектов и личных данных.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Сообщество</CardTitle>
                    <CardDescription>Активное сообщество профессионалов</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Присоединяйтесь к сообществу из тысяч разработчиков, дизайнеров и 
                  предпринимателей, готовых делиться опытом и знаниями.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Коммуникация</CardTitle>
                    <CardDescription>Встроенные инструменты для командной работы</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Встроенный чат, система уведомлений и инструменты для планирования 
                  помогают командам эффективно координировать работу.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Качество</CardTitle>
                    <CardDescription>Проверенные проекты и участники</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Система рейтингов и отзывов помогает найти надежных партнеров 
                  и качественные проекты для участия.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Готовы начать свой проект?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Присоединяйтесь к Proj•Link и найдите команду для реализации ваших идей
            <span className="text-primary font-medium"> или станьте частью интересных проектов!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Users className="w-5 h-5 mr-2" />
              Присоединиться
            </a>
            <a href="/projects" className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
              <Code className="w-5 h-5 mr-2" />
              Смотреть проекты
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
