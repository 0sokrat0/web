import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Users,
  HelpCircle
} from 'lucide-react';

export default function Contact() {
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
            Свяжитесь с нами
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            У вас есть вопросы? Мы всегда готовы помочь и ответить на любые вопросы
            <span className="text-primary font-medium"> о Proj•Link</span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                Напишите нам
              </CardTitle>
              <CardDescription>
                Заполните форму, и мы свяжемся с вами в течение 24 часов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Тема</Label>
                <Input id="subject" placeholder="Тема сообщения" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea 
                  id="message" 
                  placeholder="Расскажите нам о вашем вопросе или предложении..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Отправить сообщение
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Контактная информация
                </CardTitle>
                <CardDescription>
                  Свяжитесь с нами любым удобным способом
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">hello@projlink.ru</p>
                    <p className="text-sm text-muted-foreground">support@projlink.ru</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Адрес</h3>
                    <p className="text-muted-foreground">Москва, ул. Тверская, 1</p>
                    <p className="text-sm text-muted-foreground">БЦ "Центральный", офис 101</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Время работы</h3>
                    <p className="text-muted-foreground">Понедельник - Пятница</p>
                    <p className="text-sm text-muted-foreground">9:00 - 18:00 (МСК)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Частые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Как начать работу с платформой?</h4>
                  <p className="text-sm text-muted-foreground">
                    Просто зарегистрируйтесь, создайте профиль и начните искать проекты или создавать свои.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-1">Есть ли платные функции?</h4>
                  <p className="text-sm text-muted-foreground">
                    Основной функционал бесплатный. Премиум-функции доступны по подписке.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-1">Как обеспечена безопасность?</h4>
                  <p className="text-sm text-muted-foreground">
                    Мы используем современные методы шифрования и следуем лучшим практикам безопасности.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Мы в социальных сетях</h3>
          <div className="flex justify-center space-x-6">
            <Button variant="outline" size="lg" className="px-8">
              <Mail className="w-5 h-5 mr-2" />
              Telegram
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <MessageCircle className="w-5 h-5 mr-2" />
              Discord
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Users className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
