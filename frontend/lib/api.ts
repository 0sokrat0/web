import { 
  AuthResponse, 
  RegisterRequest, 
  LoginRequest, 
  User, 
  Project, 
  CreateProjectRequest, 
  UpdateUserRequest,
  Message,
  CreateMessageRequest,
  ProjectMember
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(errorData.error || `HTTP error! status: ${response.status}`, response.status);
  }

  return response.json();
}

export const api = {
  // Auth
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginRequest): Promise<AuthResponse> =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Users
  getUser: (id: number): Promise<User> =>
    fetchApi(`/users/${id}`),

  updateUser: (id: number, data: UpdateUserRequest): Promise<User> =>
    fetchApi(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Projects
  getProjects: (filters?: { 
    category?: string; 
    level?: string; 
    methodology?: string; 
    duration?: string; 
    involvement?: string;
    minKpi?: number;
  }): Promise<Project[]> => {
    // Моковые данные для демонстрации
    const mockProjects: Project[] = [
      {
        id: 1,
        owner_id: 1,
        title: "E-commerce платформа на React",
        description: "Создаем современную платформу для онлайн-торговли с использованием React, Node.js и PostgreSQL. Нужны разработчики с опытом работы с e-commerce решениями.",
        category: "Веб-разработка",
        level: "middle",
        methodology: "Agile",
        duration: "3-6 месяцев",
        involvement: "Полная занятость",
        kpi_score: 85,
        owner: {
          id: 1,
          name: "Алексей Петров",
          email: "alexey@example.com",
          skills: "React, Node.js, PostgreSQL",
          bio: "Опытный full-stack разработчик с 5+ лет опыта",
          avatar: "",
          created_at: "2024-01-01T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        owner_id: 2,
        title: "Мобильное приложение для фитнеса",
        description: "Разрабатываем приложение для отслеживания тренировок и питания. Используем React Native и Firebase. Ищем дизайнера и разработчиков мобильных приложений.",
        category: "Мобильная разработка",
        level: "beginner",
        methodology: "Scrum",
        duration: "2-4 месяца",
        involvement: "Частичная занятость",
        kpi_score: 72,
        owner: {
          id: 2,
          name: "Мария Сидорова",
          email: "maria@example.com",
          skills: "React Native, Firebase, UI/UX",
          bio: "Мобильный разработчик и дизайнер",
          avatar: "",
          created_at: "2024-01-02T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-14T15:30:00Z",
        updated_at: "2024-01-14T15:30:00Z"
      },
      {
        id: 3,
        owner_id: 3,
        title: "AI-чатбот для поддержки клиентов",
        description: "Создаем интеллектуального чатбота на базе GPT для автоматизации поддержки клиентов. Нужны специалисты по машинному обучению и Python разработчики.",
        category: "Искусственный интеллект",
        level: "expert",
        methodology: "Waterfall",
        duration: "6-12 месяцев",
        involvement: "Полная занятость",
        kpi_score: 92,
        owner: {
          id: 3,
          name: "Дмитрий Козлов",
          email: "dmitry@example.com",
          skills: "Python, Machine Learning, AI",
          bio: "Специалист по машинному обучению",
          avatar: "",
          created_at: "2024-01-03T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-13T09:15:00Z",
        updated_at: "2024-01-13T09:15:00Z"
      },
      {
        id: 4,
        owner_id: 4,
        title: "Дизайн системы для стартапа",
        description: "Создаем полную дизайн-систему для нового финтех стартапа. Включает логотип, UI/UX дизайн, брендинг. Ищем талантливых дизайнеров.",
        category: "Дизайн",
        level: "middle",
        methodology: "Design Thinking",
        duration: "1-3 месяца",
        involvement: "Проектная работа",
        kpi_score: 78,
        owner: {
          id: 4,
          name: "Анна Волкова",
          email: "anna@example.com",
          skills: "UI/UX Design, Figma, Branding",
          bio: "Креативный дизайнер с опытом в финтехе",
          avatar: "",
          created_at: "2024-01-04T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-12T14:20:00Z",
        updated_at: "2024-01-12T14:20:00Z"
      },
      {
        id: 5,
        owner_id: 5,
        title: "Образовательная платформа",
        description: "Разрабатываем платформу для онлайн-обучения с видеолекциями, тестами и сертификатами. Используем Next.js, Prisma, PostgreSQL.",
        category: "Образование",
        level: "middle",
        methodology: "Agile",
        duration: "4-8 месяцев",
        involvement: "Полная занятость",
        kpi_score: 88,
        owner: {
          id: 5,
          name: "Игорь Смирнов",
          email: "igor@example.com",
          skills: "Next.js, Prisma, Education",
          bio: "EdTech энтузиаст и разработчик",
          avatar: "",
          created_at: "2024-01-05T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-11T11:45:00Z",
        updated_at: "2024-01-11T11:45:00Z"
      },
      {
        id: 6,
        owner_id: 6,
        title: "Игра-головоломка на Unity",
        description: "Создаем мобильную игру-головоломку в стиле Portal. Нужны гейм-дизайнеры, программисты Unity и 3D-художники.",
        category: "Игры",
        level: "beginner",
        methodology: "Rapid Prototyping",
        duration: "3-5 месяцев",
        involvement: "Частичная занятость",
        kpi_score: 65,
        owner: {
          id: 6,
          name: "Елена Морозова",
          email: "elena@example.com",
          skills: "Unity, C#, Game Design",
          bio: "Гейм-дизайнер и Unity разработчик",
          avatar: "",
          created_at: "2024-01-06T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-10T16:30:00Z",
        updated_at: "2024-01-10T16:30:00Z"
      },
      {
        id: 7,
        owner_id: 7,
        title: "Маркетинговая кампания для SaaS",
        description: "Разрабатываем комплексную маркетинговую стратегию для B2B SaaS продукта. Нужны маркетологи, SMM-специалисты и копирайтеры.",
        category: "Маркетинг",
        level: "middle",
        methodology: "Lean Startup",
        duration: "2-3 месяца",
        involvement: "Проектная работа",
        kpi_score: 70,
        owner: {
          id: 7,
          name: "Роман Новиков",
          email: "roman@example.com",
          skills: "Marketing, SMM, Content",
          bio: "Маркетолог с опытом в B2B SaaS",
          avatar: "",
          created_at: "2024-01-07T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-09T13:15:00Z",
        updated_at: "2024-01-09T13:15:00Z"
      },
      {
        id: 8,
        owner_id: 8,
        title: "Блокчейн-приложение для NFT",
        description: "Создаем децентрализованное приложение для торговли NFT на Ethereum. Нужны солидity разработчики и специалисты по Web3.",
        category: "Блокчейн",
        level: "expert",
        methodology: "Agile",
        duration: "6-9 месяцев",
        involvement: "Полная занятость",
        kpi_score: 95,
        owner: {
          id: 8,
          name: "Артем Лебедев",
          email: "artem@example.com",
          skills: "Solidity, Web3, Blockchain",
          bio: "Блокчейн разработчик и Web3 эксперт",
          avatar: "",
          created_at: "2024-01-08T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-08T08:00:00Z",
        updated_at: "2024-01-08T08:00:00Z"
      },
      {
        id: 9,
        owner_id: 9,
        title: "Мобильное приложение для доставки еды",
        description: "Разрабатываем приложение для заказа и доставки еды с интеграцией с ресторанами. Нужны React Native разработчики и дизайнеры UX/UI.",
        category: "Мобильная разработка",
        level: "middle",
        methodology: "Scrum",
        duration: "4-6 месяцев",
        involvement: "Полная занятость",
        kpi_score: 82,
        owner: {
          id: 9,
          name: "Ольга Козлова",
          email: "olga@example.com",
          skills: "React Native, Firebase, Payment Systems",
          bio: "Разработчик мобильных приложений с опытом в e-commerce",
          avatar: "",
          created_at: "2024-01-09T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-16T09:30:00Z",
        updated_at: "2024-01-16T09:30:00Z"
      },
      {
        id: 10,
        owner_id: 10,
        title: "Веб-сайт для медицинской клиники",
        description: "Создаем современный сайт для медицинской клиники с онлайн-записью, личным кабинетом пациентов и системой управления расписанием.",
        category: "Веб-разработка",
        level: "expert",
        methodology: "Waterfall",
        duration: "5-8 месяцев",
        involvement: "Полная занятость",
        kpi_score: 90,
        owner: {
          id: 10,
          name: "Михаил Волков",
          email: "mikhail@example.com",
          skills: "Vue.js, Laravel, Medical Systems",
          bio: "Full-stack разработчик с опытом в медицинских системах",
          avatar: "",
          created_at: "2024-01-10T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-17T14:15:00Z",
        updated_at: "2024-01-17T14:15:00Z"
      },
      {
        id: 11,
        owner_id: 11,
        title: "Платформа для онлайн-обучения языкам",
        description: "Разрабатываем интерактивную платформу для изучения иностранных языков с AI-преподавателем, голосовым распознаванием и геймификацией.",
        category: "Образование",
        level: "expert",
        methodology: "Agile",
        duration: "8-12 месяцев",
        involvement: "Полная занятость",
        kpi_score: 94,
        owner: {
          id: 11,
          name: "Екатерина Соколова",
          email: "ekaterina@example.com",
          skills: "AI/ML, Python, Educational Technology",
          bio: "Специалист по образовательным технологиям и AI",
          avatar: "",
          created_at: "2024-01-11T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-18T11:45:00Z",
        updated_at: "2024-01-18T11:45:00Z"
      },
      {
        id: 12,
        owner_id: 12,
        title: "Система управления складом",
        description: "Создаем комплексную систему управления складскими запасами с RFID-интеграцией, аналитикой и мобильным приложением для сотрудников.",
        category: "Веб-разработка",
        level: "middle",
        methodology: "Agile",
        duration: "6-9 месяцев",
        involvement: "Полная занятость",
        kpi_score: 87,
        owner: {
          id: 12,
          name: "Андрей Морозов",
          email: "andrey@example.com",
          skills: "Java, Spring Boot, IoT Integration",
          bio: "Backend разработчик с опытом в логистических системах",
          avatar: "",
          created_at: "2024-01-12T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-19T16:20:00Z",
        updated_at: "2024-01-19T16:20:00Z"
      },
      {
        id: 13,
        owner_id: 13,
        title: "Социальная сеть для фотографов",
        description: "Разрабатываем платформу для обмена фотографиями с функциями конкурсов, рейтингов и монетизации контента. Нужны React и Node.js разработчики.",
        category: "Веб-разработка",
        level: "beginner",
        methodology: "Lean Startup",
        duration: "3-4 месяца",
        involvement: "Частичная занятость",
        kpi_score: 68,
        owner: {
          id: 13,
          name: "Дарья Петрова",
          email: "darya@example.com",
          skills: "React, Node.js, Photography",
          bio: "Фотограф и frontend разработчик",
          avatar: "",
          created_at: "2024-01-13T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-20T10:00:00Z",
        updated_at: "2024-01-20T10:00:00Z"
      },
      {
        id: 14,
        owner_id: 14,
        title: "Приложение для трекинга фитнеса",
        description: "Создаем приложение для отслеживания тренировок, питания и здоровья с интеграцией с фитнес-браслетами и персональными тренерами.",
        category: "Мобильная разработка",
        level: "middle",
        methodology: "Scrum",
        duration: "4-7 месяцев",
        involvement: "Полная занятость",
        kpi_score: 80,
        owner: {
          id: 14,
          name: "Сергей Иванов",
          email: "sergey@example.com",
          skills: "Flutter, Health APIs, Wearable Tech",
          bio: "Мобильный разработчик с опытом в health-tech",
          avatar: "",
          created_at: "2024-01-14T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-21T13:30:00Z",
        updated_at: "2024-01-21T13:30:00Z"
      },
      {
        id: 15,
        owner_id: 15,
        title: "Платформа для фрилансеров",
        description: "Разрабатываем маркетплейс для фрилансеров с системой поиска заказов, безопасными платежами, рейтингами и встроенным мессенджером.",
        category: "Веб-разработка",
        level: "expert",
        methodology: "Agile",
        duration: "9-15 месяцев",
        involvement: "Полная занятость",
        kpi_score: 96,
        owner: {
          id: 15,
          name: "Наталья Кузнецова",
          email: "natalia@example.com",
          skills: "Next.js, Stripe, Real-time Chat",
          bio: "Full-stack разработчик с опытом в marketplace проектах",
          avatar: "",
          created_at: "2024-01-15T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-22T08:45:00Z",
        updated_at: "2024-01-22T08:45:00Z"
      },
      {
        id: 16,
        owner_id: 16,
        title: "Игра-симулятор фермы",
        description: "Создаем мобильную игру-симулятор фермы с мультиплеером, системой торговли и социальными функциями. Нужны Unity разработчики и 2D художники.",
        category: "Игры",
        level: "beginner",
        methodology: "Rapid Prototyping",
        duration: "2-4 месяца",
        involvement: "Частичная занятость",
        kpi_score: 63,
        owner: {
          id: 16,
          name: "Владимир Соколов",
          email: "vladimir@example.com",
          skills: "Unity, C#, Game Design, 2D Art",
          bio: "Инди-гейм-разработчик и художник",
          avatar: "",
          created_at: "2024-01-16T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-23T15:10:00Z",
        updated_at: "2024-01-23T15:10:00Z"
      },
      {
        id: 17,
        owner_id: 3,
        title: "Платформа для управления задачами",
        description: "Создаем современную систему управления проектами с Kanban досками, временным трекингом и командной работой. Нужны React и Node.js разработчики.",
        category: "Веб-разработка",
        level: "middle",
        methodology: "Agile",
        duration: "4-6 месяцев",
        involvement: "Полная занятость",
        kpi_score: 88,
        owner: {
          id: 3,
          name: "Мария Сидорова",
          email: "maria@example.com",
          skills: "React, Node.js, MongoDB, TypeScript",
          bio: "Full-stack разработчик с опытом создания корпоративных решений",
          avatar: "",
          created_at: "2024-01-02T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-24T09:15:00Z",
        updated_at: "2024-01-24T09:15:00Z"
      },
      {
        id: 18,
        owner_id: 4,
        title: "Мобильная игра-головоломка",
        description: "Разрабатываем казуальную мобильную игру с физикой и головоломками. Используем Unity и C#. Ищем гейм-дизайнеров и Unity разработчиков.",
        category: "Игры",
        level: "beginner",
        methodology: "Rapid Prototyping",
        duration: "2-3 месяца",
        involvement: "Частичная занятость",
        kpi_score: 67,
        owner: {
          id: 4,
          name: "Дмитрий Козлов",
          email: "dmitry@example.com",
          skills: "Unity, C#, Game Design, 3D Modeling",
          bio: "Гейм-разработчик с 3+ лет опыта создания мобильных игр",
          avatar: "",
          created_at: "2024-01-03T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-25T11:30:00Z",
        updated_at: "2024-01-25T11:30:00Z"
      },
      {
        id: 19,
        owner_id: 5,
        title: "Система аналитики для e-commerce",
        description: "Создаем платформу для анализа продаж и поведения клиентов в интернет-магазинах. Используем Python, Django, PostgreSQL и машинное обучение.",
        category: "Искусственный интеллект",
        level: "expert",
        methodology: "Waterfall",
        duration: "8-12 месяцев",
        involvement: "Полная занятость",
        kpi_score: 94,
        owner: {
          id: 5,
          name: "Анна Волкова",
          email: "anna@example.com",
          skills: "Python, Django, PostgreSQL, Machine Learning, Data Science",
          bio: "Data Scientist с 6+ лет опыта в аналитике и машинном обучении",
          avatar: "",
          created_at: "2024-01-04T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-26T14:45:00Z",
        updated_at: "2024-01-26T14:45:00Z"
      },
      {
        id: 20,
        owner_id: 6,
        title: "Дизайн мобильного приложения для банка",
        description: "Создаем UI/UX дизайн для мобильного банковского приложения с фокусом на безопасность и удобство использования. Нужны UX/UI дизайнеры.",
        category: "Дизайн",
        level: "expert",
        methodology: "Design Thinking",
        duration: "3-4 месяца",
        involvement: "Проектная работа",
        kpi_score: 91,
        owner: {
          id: 6,
          name: "Елена Морозова",
          email: "elena@example.com",
          skills: "UI/UX Design, Figma, Adobe Creative Suite, User Research",
          bio: "Senior UX/UI дизайнер с 7+ лет опыта в финтех проектах",
          avatar: "",
          created_at: "2024-01-05T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-27T16:20:00Z",
        updated_at: "2024-01-27T16:20:00Z"
      },
      {
        id: 21,
        owner_id: 7,
        title: "Маркетинговая стратегия для SaaS",
        description: "Разрабатываем комплексную маркетинговую стратегию для B2B SaaS продукта с фокусом на inbound маркетинг и автоматизацию. Нужны маркетологи и SMM специалисты.",
        category: "Маркетинг",
        level: "middle",
        methodology: "Lean Startup",
        duration: "2-4 месяца",
        involvement: "Проектная работа",
        kpi_score: 76,
        owner: {
          id: 7,
          name: "Сергей Новиков",
          email: "sergey@example.com",
          skills: "Digital Marketing, SMM, Content Marketing, Analytics",
          bio: "Маркетолог с 5+ лет опыта в B2B и SaaS проектах",
          avatar: "",
          created_at: "2024-01-06T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-28T10:10:00Z",
        updated_at: "2024-01-28T10:10:00Z"
      },
      {
        id: 22,
        owner_id: 8,
        title: "Платформа для онлайн-обучения программированию",
        description: "Создаем интерактивную платформу для изучения программирования с практическими заданиями, код-ревью и менторством. Используем React, Node.js и Docker.",
        category: "Образование",
        level: "middle",
        methodology: "Agile",
        duration: "6-9 месяцев",
        involvement: "Полная занятость",
        kpi_score: 89,
        owner: {
          id: 8,
          name: "Игорь Соколов",
          email: "igor@example.com",
          skills: "React, Node.js, Docker, Educational Technology",
          bio: "Разработчик и преподаватель с 8+ лет опыта в образовательных проектах",
          avatar: "",
          created_at: "2024-01-07T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-29T13:25:00Z",
        updated_at: "2024-01-29T13:25:00Z"
      },
      {
        id: 23,
        owner_id: 9,
        title: "Блокчейн-приложение для децентрализованной торговли",
        description: "Разрабатываем DeFi приложение для торговли токенами с автоматическими маркет-мейкерами. Используем Solidity, Web3.js и React. Нужны блокчейн разработчики.",
        category: "Блокчейн",
        level: "expert",
        methodology: "Agile",
        duration: "10-15 месяцев",
        involvement: "Полная занятость",
        kpi_score: 97,
        owner: {
          id: 9,
          name: "Владимир Петров",
          email: "vladimir@example.com",
          skills: "Solidity, Web3.js, React, DeFi, Smart Contracts",
          bio: "Блокчейн разработчик с 6+ лет опыта в DeFi проектах",
          avatar: "",
          created_at: "2024-01-08T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-30T15:40:00Z",
        updated_at: "2024-01-30T15:40:00Z"
      },
      {
        id: 24,
        owner_id: 10,
        title: "Приложение для фитнес-трекинга с AI",
        description: "Создаем умное приложение для отслеживания тренировок с AI-тренером, анализом движений и персональными рекомендациями. Используем React Native и TensorFlow.",
        category: "Мобильная разработка",
        level: "expert",
        methodology: "Scrum",
        duration: "7-10 месяцев",
        involvement: "Полная занятость",
        kpi_score: 93,
        owner: {
          id: 10,
          name: "Ольга Кузнецова",
          email: "olga@example.com",
          skills: "React Native, TensorFlow, AI/ML, Health Tech",
          bio: "Mobile разработчик с 7+ лет опыта в health-tech проектах",
          avatar: "",
          created_at: "2024-01-09T00:00:00Z"
        },
        members: [],
        created_at: "2024-01-31T12:15:00Z",
        updated_at: "2024-01-31T12:15:00Z"
      },
      {
        id: 25,
        owner_id: 11,
        title: "DevOps инфраструктура для микросервисов",
        description: "Настраиваем CI/CD пайплайны, контейнеризацию и мониторинг для микросервисной архитектуры. Используем Kubernetes, Docker, GitLab CI и Prometheus.",
        category: "DevOps",
        level: "expert",
        methodology: "Agile",
        duration: "3-5 месяцев",
        involvement: "Полная занятость",
        kpi_score: 90,
        owner: {
          id: 11,
          name: "Андрей Смирнов",
          email: "andrey@example.com",
          skills: "Kubernetes, Docker, AWS, GitLab CI, Prometheus, Terraform",
          bio: "DevOps инженер с 8+ лет опыта в облачных технологиях",
          avatar: "",
          created_at: "2024-01-10T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-01T09:30:00Z",
        updated_at: "2024-02-01T09:30:00Z"
      },
      {
        id: 26,
        owner_id: 12,
        title: "AR-приложение для обучения анатомии",
        description: "Создаем интерактивное AR-приложение для изучения анатомии человека с 3D моделями и голографическими проекциями. Используем Unity и ARCore.",
        category: "AR/VR",
        level: "middle",
        methodology: "Design Thinking",
        duration: "6-8 месяцев",
        involvement: "Полная занятость",
        kpi_score: 86,
        owner: {
          id: 12,
          name: "Татьяна Лебедева",
          email: "tatyana@example.com",
          skills: "Unity, ARCore, 3D Modeling, Medical Visualization",
          bio: "AR/VR разработчик с 5+ лет опыта в образовательных проектах",
          avatar: "",
          created_at: "2024-01-11T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-02T14:20:00Z",
        updated_at: "2024-02-02T14:20:00Z"
      },
      {
        id: 27,
        owner_id: 13,
        title: "Система кибербезопасности для банка",
        description: "Разрабатываем комплексную систему защиты от кибератак для банковского сектора. Включает мониторинг угроз, анализ уязвимостей и автоматический ответ на инциденты.",
        category: "Кибербезопасность",
        level: "expert",
        methodology: "Waterfall",
        duration: "12+ месяцев",
        involvement: "Полная занятость",
        kpi_score: 98,
        owner: {
          id: 13,
          name: "Михаил Федоров",
          email: "mikhail@example.com",
          skills: "Cybersecurity, Penetration Testing, SIEM, Incident Response",
          bio: "Специалист по кибербезопасности с 10+ лет опыта в финтех",
          avatar: "",
          created_at: "2024-01-12T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-03T11:45:00Z",
        updated_at: "2024-02-03T11:45:00Z"
      },
      {
        id: 28,
        owner_id: 14,
        title: "IoT-система для умного дома",
        description: "Создаем экосистему IoT устройств для автоматизации дома с голосовым управлением, энергосбережением и безопасностью. Используем ESP32, MQTT и React Native.",
        category: "IoT",
        level: "middle",
        methodology: "Agile",
        duration: "4-7 месяцев",
        involvement: "Полная занятость",
        kpi_score: 82,
        owner: {
          id: 14,
          name: "Екатерина Романова",
          email: "ekaterina@example.com",
          skills: "IoT, ESP32, MQTT, React Native, Home Automation",
          bio: "IoT разработчик с 6+ лет опыта в умных домах",
          avatar: "",
          created_at: "2024-01-13T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-04T16:10:00Z",
        updated_at: "2024-02-04T16:10:00Z"
      },
      {
        id: 29,
        owner_id: 15,
        title: "Платформа для анализа больших данных",
        description: "Создаем систему для обработки и анализа больших данных с машинным обучением и визуализацией. Используем Apache Spark, Kafka, Python и React.",
        category: "Data Science",
        level: "expert",
        methodology: "Scrum",
        duration: "8-12 месяцев",
        involvement: "Полная занятость",
        kpi_score: 95,
        owner: {
          id: 15,
          name: "Павел Козлов",
          email: "pavel@example.com",
          skills: "Apache Spark, Kafka, Python, Machine Learning, Data Visualization",
          bio: "Data Scientist с 7+ лет опыта в big data проектах",
          avatar: "",
          created_at: "2024-01-14T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-05T13:35:00Z",
        updated_at: "2024-02-05T13:35:00Z"
      },
      {
        id: 30,
        owner_id: 16,
        title: "Волонтерский проект по обучению детей программированию",
        description: "Организуем бесплатные курсы программирования для детей из малообеспеченных семей. Нужны преподаватели, менторы и разработчики образовательного контента.",
        category: "Образование",
        level: "beginner",
        methodology: "Lean Startup",
        duration: "6-9 месяцев",
        involvement: "Волонтерство",
        kpi_score: 100,
        owner: {
          id: 16,
          name: "Наталья Васильева",
          email: "natalia@example.com",
          skills: "Teaching, Educational Content, Python, Scratch, Mentoring",
          bio: "Преподаватель программирования с 4+ лет опыта работы с детьми",
          avatar: "",
          created_at: "2024-01-15T00:00:00Z"
        },
        members: [],
        created_at: "2024-02-06T10:00:00Z",
        updated_at: "2024-02-06T10:00:00Z"
      }
    ];

    // Фильтрация моковых данных
    let filteredProjects = mockProjects;
    
    if (filters?.category) {
      filteredProjects = filteredProjects.filter(project => 
        project.category === filters.category
      );
    }
    
    if (filters?.level) {
      filteredProjects = filteredProjects.filter(project => 
        project.level === filters.level
      );
    }
    
    if (filters?.methodology) {
      filteredProjects = filteredProjects.filter(project => 
        project.methodology === filters.methodology
      );
    }
    
    if (filters?.duration) {
      filteredProjects = filteredProjects.filter(project => 
        project.duration === filters.duration
      );
    }
    
    if (filters?.involvement) {
      filteredProjects = filteredProjects.filter(project => 
        project.involvement === filters.involvement
      );
    }
    
    if (filters?.minKpi) {
      filteredProjects = filteredProjects.filter(project => 
        project.kpi_score >= filters.minKpi!
      );
    }

    // Имитируем задержку API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filteredProjects);
      }, 500);
    });
  },

  getProject: (id: number): Promise<Project> =>
    fetchApi(`/projects/${id}`),

  createProject: (data: CreateProjectRequest): Promise<Project> =>
    fetchApi('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProject: (id: number, data: Partial<CreateProjectRequest>): Promise<Project> =>
    fetchApi(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProject: (id: number): Promise<void> =>
    fetchApi(`/projects/${id}`, {
      method: 'DELETE',
    }),

  // Members
  applyToProject: (projectId: number): Promise<ProjectMember> =>
    fetchApi(`/projects/${projectId}/apply`, {
      method: 'POST',
    }),

  acceptMember: (projectId: number, userId: number): Promise<ProjectMember> =>
    fetchApi(`/projects/${projectId}/accept/${userId}`, {
      method: 'POST',
    }),

  // Messages
  getProjectMessages: (projectId: number): Promise<Message[]> =>
    fetchApi(`/projects/${projectId}/messages`),

  sendMessage: (projectId: number, data: CreateMessageRequest): Promise<Message> =>
    fetchApi(`/projects/${projectId}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export { ApiError };
