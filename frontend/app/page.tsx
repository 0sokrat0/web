import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Rocket, Users, MessageCircle, ArrowRight, Sparkles, Zap, Shield, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 mb-8">
            <Badge variant="secondary" className="px-4 py-2 border-primary/20 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Новая платформа для команд
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Proj•Link
        </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Найдите команду для своего проекта или присоединитесь к интересным инициативам. 
            <span className="text-primary font-medium"> Создавайте, участвуйте, развивайтесь вместе!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/projects">
              <Button size="lg" className="px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90">
                <Rocket className="w-6 h-6 mr-3" />
                Смотреть проекты
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-accent/50 hover:scale-105 transition-all duration-300">
                <Users className="w-6 h-6 mr-3" />
                Начать работу
              </Button>
            </Link>
          </div>

          <Separator className="max-w-md mx-auto" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-1" />
              Возможности
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Почему выбирают Proj•Link?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы создали платформу, которая объединяет талантливых людей для реализации амбициозных проектов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Создайте проект</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Опубликуйте свою идею и найдите единомышленников для её реализации. 
                  Получите поддержку от опытных разработчиков и дизайнеров.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Найдите команду</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Присоединитесь к проектам, которые соответствуют вашим навыкам и интересам. 
                  Развивайтесь вместе с единомышленниками.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Общайтесь</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Используйте встроенный чат для координации работы над проектом. 
                  Обменивайтесь идеями и получайте обратную связь.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              <Zap className="w-3 h-3 mr-1" />
              Статистика
            </Badge>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              Наши достижения
            </h2>
          </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                   <div className="text-primary-foreground group">
                     <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">30</div>
                     <div className="text-primary-foreground/80 font-medium">Активных проектов</div>
                   </div>
                   <div className="text-primary-foreground group">
                     <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">90+</div>
                     <div className="text-primary-foreground/80 font-medium">Участников</div>
                   </div>
                   <div className="text-primary-foreground group">
                     <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
                     <div className="text-primary-foreground/80 font-medium">Завершенных проектов</div>
                   </div>
                   <div className="text-primary-foreground group">
                     <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                     <div className="text-primary-foreground/80 font-medium">Довольных пользователей</div>
                   </div>
                 </div>
          </div>
        </div>

      {/* CTA Section */}
      <div className="py-24 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-6">
            <Shield className="w-3 h-3 mr-1" />
            Готовы начать?
          </Badge>
          
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Присоединяйтесь к Proj•Link
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Тысячи разработчиков уже нашли свои команды и реализовали мечты. 
            <span className="text-primary font-medium"> Ваша очередь!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Создать аккаунт
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
          </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="px-8 py-3 border-2 hover:bg-accent/50 transition-all duration-300">
                <Rocket className="w-5 h-5 mr-2" />
                Посмотреть проекты
              </Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
