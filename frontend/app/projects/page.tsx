'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Project } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, User, Calendar, Clock, Star, ArrowRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState({ 
    category: '', 
    level: '', 
    methodology: '', 
    duration: '', 
    involvement: '',
    minKpi: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const categories = [
    'Веб-разработка', 'Мобильная разработка', 'Дизайн', 'Маркетинг', 
    'Образование', 'Игры', 'Искусственный интеллект', 'Блокчейн',
    'DevOps', 'Data Science', 'Кибербезопасность', 'IoT', 'AR/VR'
  ];
  const levels = ['beginner', 'middle', 'expert'];
  const methodologies = [
    'Agile', 'Scrum', 'Waterfall', 'Design Thinking', 'Lean Startup', 
    'Rapid Prototyping', 'Kanban', 'SAFe', 'Crystal', 'XP'
  ];
  const durations = [
    '1-3 месяца', '2-4 месяца', '3-6 месяцев', '4-8 месяцев', 
    '6-9 месяцев', '6-12 месяцев', '8-12 месяцев', '9-15 месяцев',
    '1-2 недели', '1 месяц', '12+ месяцев'
  ];
  const involvements = [
    'Частичная занятость', 'Полная занятость', 'Проектная работа',
    'Волонтерство', 'Стажировка', 'Консультации'
  ];
  const kpiRanges = [
    { value: '60', label: '60+ баллов' },
    { value: '70', label: '70+ баллов' },
    { value: '80', label: '80+ баллов' },
    { value: '90', label: '90+ баллов' }
  ];

  useEffect(() => {
    loadProjects();
  }, [filters]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const filterParams = {
        category: filters.category || undefined,
        level: filters.level || undefined,
        methodology: filters.methodology || undefined,
        duration: filters.duration || undefined,
        involvement: filters.involvement || undefined,
        minKpi: filters.minKpi ? Number(filters.minKpi) : undefined
      };
      const data = await api.getProjects(filterParams);
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({ 
      category: '', 
      level: '', 
      methodology: '', 
      duration: '', 
      involvement: '',
      minKpi: ''
    });
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Проекты</h1>
            </div>
            <p className="text-muted-foreground">
              Найдите интересные проекты или создайте свой
            </p>
          </div>
          {user && (
            <Link href="/projects/create">
              <Button className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-4 h-4" />
                Создать проект
              </Button>
            </Link>
          )}
        </div>

               {/* Filters */}
               <Card className="mb-6">
                 <CardHeader>
                   <div className="flex items-center justify-between">
                     <CardTitle className="text-lg">Фильтры</CardTitle>
                     <Button variant="outline" size="sm" onClick={resetFilters}>
                       <Search className="w-4 h-4 mr-2" />
                       Сбросить
                     </Button>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="category">Категория</Label>
                       <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Все категории" />
                         </SelectTrigger>
                         <SelectContent>
                           {categories.map((cat) => (
                             <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="level">Уровень</Label>
                       <Select value={filters.level} onValueChange={(value) => handleFilterChange('level', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Все уровни" />
                         </SelectTrigger>
                         <SelectContent>
                           {levels.map((level) => (
                             <SelectItem key={level} value={level}>{getLevelText(level)}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="methodology">Методология</Label>
                       <Select value={filters.methodology} onValueChange={(value) => handleFilterChange('methodology', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Все методологии" />
                         </SelectTrigger>
                         <SelectContent>
                           {methodologies.map((method) => (
                             <SelectItem key={method} value={method}>{method}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="duration">Срок реализации</Label>
                       <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Все сроки" />
                         </SelectTrigger>
                         <SelectContent>
                           {durations.map((duration) => (
                             <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="involvement">Степень вовлеченности</Label>
                       <Select value={filters.involvement} onValueChange={(value) => handleFilterChange('involvement', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Все типы" />
                         </SelectTrigger>
                         <SelectContent>
                           {involvements.map((involvement) => (
                             <SelectItem key={involvement} value={involvement}>{involvement}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="minKpi">Минимальный KPI</Label>
                       <Select value={filters.minKpi} onValueChange={(value) => handleFilterChange('minKpi', value)}>
                         <SelectTrigger>
                           <SelectValue placeholder="Любой KPI" />
                         </SelectTrigger>
                         <SelectContent>
                           {kpiRanges.map((range) => (
                             <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>
                   </div>
                 </CardContent>
               </Card>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Загрузка проектов...</div>
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">Проекты не найдены</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="group hover-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      <Link href={`/projects/${project.id}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </CardTitle>
                    <Badge variant={getLevelVariant(project.level)} className="ml-2 group-hover:scale-110 transition-transform duration-300">
                      {getLevelText(project.level)}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                      <User className="w-4 h-4" />
                      {project.owner.name}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
                      <Clock className="w-4 h-4" />
                      {new Date(project.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  
                         <div className="flex items-center justify-between mb-4">
                           <Badge variant="outline" className="text-xs group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                             {project.category}
                           </Badge>
                           <div className="flex items-center gap-2">
                             <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                               KPI: {project.kpi_score}
                             </Badge>
                             <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                               {project.members?.length || 0} участников
                             </span>
                           </div>
                         </div>
                  
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-105 transition-all duration-300 font-medium">
                      Подробнее
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
