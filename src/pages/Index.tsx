import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sortBy, setSortBy] = useState('popular');
  const [cartItems, setCartItems] = useState([
    { id: 1, game: 'Dota 2', title: '1000 MMR', price: 2500, quantity: 1 },
    { id: 2, game: 'CS2', title: 'Аккаунт Prime', price: 1200, quantity: 1 },
    { id: 4, game: 'Fortnite', title: '5000 V-Bucks', price: 3200, quantity: 1 },
  ]);

  const categories = [
    { id: 1, name: 'Игровая валюта', icon: 'Coins', color: 'bg-primary' },
    { id: 2, name: 'Аккаунты', icon: 'UserCircle', color: 'bg-secondary' },
    { id: 3, name: 'Предметы', icon: 'Package', color: 'bg-accent' },
    { id: 4, name: 'Буст рейтинга', icon: 'TrendingUp', color: 'bg-primary' },
    { id: 5, name: 'Прокачка', icon: 'Zap', color: 'bg-secondary' },
    { id: 6, name: 'Скины', icon: 'Sparkles', color: 'bg-accent' },
  ];

  const products = [
    { id: 1, game: 'Dota 2', title: '1000 MMR', price: 2500, seller: 'ProGamer123', rating: 4.9, sales: 523, category: 'Буст рейтинга' },
    { id: 2, game: 'CS2', title: 'Аккаунт Prime', price: 1200, seller: 'GameMaster', rating: 5.0, sales: 892, category: 'Аккаунты' },
    { id: 3, game: 'Valorant', title: '1000 VP', price: 800, seller: 'ShopKing', rating: 4.8, sales: 234, category: 'Игровая валюта' },
    { id: 4, game: 'Fortnite', title: '5000 V-Bucks', price: 3200, seller: 'EpicStore', rating: 4.9, sales: 1243, category: 'Игровая валюта' },
    { id: 5, game: 'League of Legends', title: 'Аккаунт Gold', price: 1500, seller: 'LeagueKing', rating: 4.7, sales: 345, category: 'Аккаунты' },
    { id: 6, game: 'Apex Legends', title: '2000 Coins', price: 1100, seller: 'ApexPro', rating: 4.9, sales: 678, category: 'Игровая валюта' },
  ];

  const sellers = [
    { id: 1, name: 'ProGamer123', rating: 4.9, sales: 1523, verified: true },
    { id: 2, name: 'GameMaster', rating: 5.0, sales: 2892, verified: true },
    { id: 3, name: 'ShopKing', rating: 4.8, sales: 834, verified: true },
    { id: 4, name: 'EpicStore', rating: 4.9, sales: 3243, verified: true },
  ];

  const orders = [
    { id: 1, game: 'Valorant', title: '1000 VP', price: 800, date: '25.01.2024', status: 'Доставлено' },
    { id: 2, game: 'Dota 2', title: '500 MMR', price: 1200, date: '23.01.2024', status: 'В обработке' },
  ];

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUser({ name: email.split('@')[0], email });
    toast({
      title: "Добро пожаловать!",
      description: `Вы успешно вошли как ${email.split('@')[0]}`,
    });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true);
    setUser({ name, email });
    toast({
      title: "Регистрация успешна!",
      description: `Добро пожаловать, ${name}!`,
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Товар удалён",
      description: "Товар удалён из корзины",
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const addToCart = (product: typeof products[0]) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      updateQuantity(product.id, 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Добавлено в корзину!",
      description: product.title,
    });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const completeOrder = () => {
    toast({
      title: "Заказ оформлен!",
      description: `Оплата через ${paymentMethod === 'card' ? 'карту' : paymentMethod === 'sbp' ? 'СБП' : 'криптовалюту'}. Сумма: ${cartTotal} ₽`,
    });
    setCartItems([]);
    setCheckoutOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.sales - a.sales;
  });

  const renderHome = () => (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              🔥 Безопасные сделки с гарантией
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Маркетплейс игровых ценностей
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Покупайте и продавайте игровую валюту, аккаунты и предметы с защитой сделок
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setActiveSection('catalog')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Icon name="ShoppingBag" className="mr-2" size={20} />
                Начать покупки
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Icon name="Store" className="mr-2" size={20} />
                Стать продавцом
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>

      <section className="py-12 md:py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Популярные категории</h3>
            <Button variant="ghost" onClick={() => setActiveSection('catalog')} className="text-primary hover:text-primary/80">
              Смотреть все
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.id} onClick={() => { setSelectedCategory(category.name); setActiveSection('catalog'); }} className="group cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20 border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={category.icon as any} size={32} className="text-background" />
                  </div>
                  <p className="font-semibold text-sm">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Горячие предложения</h3>
            <Button variant="ghost" onClick={() => setActiveSection('catalog')} className="text-primary">
              Смотреть всё
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                      {product.game}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Icon name="Star" size={16} fill="currentColor" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Icon name="ShoppingCart" size={12} className="inline mr-1" />
                        {product.sales} продаж
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="User" size={16} />
                      <span className="truncate max-w-24">{product.seller}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button onClick={() => addToCart(product)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                    <Icon name="ShoppingBag" className="mr-2" size={18} />
                    Купить сейчас
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Почему выбирают нас?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary-foreground" />
                </div>
                <h4 className="font-bold text-lg mb-2">Безопасность</h4>
                <p className="text-muted-foreground text-sm">Гарантия защиты всех сделок</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-secondary-foreground" />
                </div>
                <h4 className="font-bold text-lg mb-2">Быстро</h4>
                <p className="text-muted-foreground text-sm">Моментальная доставка товаров</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} className="text-accent-foreground" />
                </div>
                <h4 className="font-bold text-lg mb-2">Поддержка 24/7</h4>
                <p className="text-muted-foreground text-sm">Всегда готовы помочь</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <section className="py-12 md:py-16 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h3 className="text-2xl md:text-3xl font-bold">
            {selectedCategory || 'Каталог товаров'}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {selectedCategory && (
              <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
                <Icon name="X" className="mr-2" size={16} />
                Сбросить фильтр
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" className="mr-2" size={16} />
                  Категории
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Выберите категорию</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.name ? "default" : "outline"}
                      onClick={() => { setSelectedCategory(cat.name); }}
                      className="justify-start"
                    >
                      <Icon name={cat.icon as any} className="mr-2" size={18} />
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="ArrowUpDown" className="mr-2" size={16} />
                  Сортировка
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Сортировать по</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-4">
                  <Button variant={sortBy === 'popular' ? "default" : "outline"} onClick={() => setSortBy('popular')} className="w-full justify-start">
                    Популярности
                  </Button>
                  <Button variant={sortBy === 'price-asc' ? "default" : "outline"} onClick={() => setSortBy('price-asc')} className="w-full justify-start">
                    Цена: по возрастанию
                  </Button>
                  <Button variant={sortBy === 'price-desc' ? "default" : "outline"} onClick={() => setSortBy('price-desc')} className="w-full justify-start">
                    Цена: по убыванию
                  </Button>
                  <Button variant={sortBy === 'rating' ? "default" : "outline"} onClick={() => setSortBy('rating')} className="w-full justify-start">
                    Рейтинг
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    {product.game}
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={16} fill="currentColor" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Icon name="ShoppingCart" size={12} className="inline mr-1" />
                      {product.sales} продаж
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={16} />
                    <span className="truncate max-w-24">{product.seller}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button onClick={() => addToCart(product)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                  <Icon name="ShoppingBag" className="mr-2" size={18} />
                  Купить сейчас
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderSellers = () => (
    <section className="py-12 md:py-16 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">Топ продавцов</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <Card key={seller.id} className="text-center hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={40} className="text-primary-foreground" />
                </div>
                <h4 className="font-bold text-lg mb-2 flex items-center justify-center gap-2">
                  {seller.name}
                  {seller.verified && <Icon name="BadgeCheck" size={18} className="text-primary" />}
                </h4>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  <Icon name="Star" size={16} fill="currentColor" />
                  <span className="text-sm font-semibold">{seller.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{seller.sales} продаж</p>
                <Button className="w-full mt-4" variant="outline">
                  Открыть профиль
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderRatings = () => (
    <section className="py-12 md:py-16 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-8">Рейтинги и отзывы</h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">Пользователь_{i}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Icon name="Star" size={16} fill="currentColor" />
                      <span className="text-sm font-semibold">5.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Отличный сервис! Товар получил моментально, всё прошло гладко.
                  </p>
                  <p className="text-xs text-muted-foreground">2 дня назад</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderSupport = () => (
    <section className="py-12 md:py-16 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Поддержка</h3>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="support-email">Ваш Email</Label>
                <Input id="support-email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="support-subject">Тема</Label>
                <Input id="support-subject" placeholder="Опишите вашу проблему" />
              </div>
              <div>
                <Label htmlFor="support-message">Сообщение</Label>
                <Textarea id="support-message" rows={6} placeholder="Расскажите подробнее..." />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => toast({ title: "Обращение отправлено!", description: "Мы ответим в течение 24 часов" })}>
                <Icon name="Send" className="mr-2" size={18} />
                Отправить обращение
              </Button>
            </div>
          </Card>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <Icon name="Mail" size={32} className="mx-auto mb-2 text-primary" />
              <p className="font-semibold mb-1">Email</p>
              <p className="text-sm text-muted-foreground">support@gamemarket.ru</p>
            </Card>
            <Card className="p-4 text-center">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-primary" />
              <p className="font-semibold mb-1">Telegram</p>
              <p className="text-sm text-muted-foreground">@gamemarket_support</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 onClick={() => setActiveSection('home')} className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent cursor-pointer">
                GameMarket
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => setActiveSection('home')} className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-primary' : 'hover:text-primary'}`}>
                  Главная
                </button>
                <button onClick={() => setActiveSection('catalog')} className={`text-sm font-medium transition-colors ${activeSection === 'catalog' ? 'text-primary' : 'hover:text-primary'}`}>
                  Каталог
                </button>
                <button onClick={() => setActiveSection('sellers')} className={`text-sm font-medium transition-colors ${activeSection === 'sellers' ? 'text-primary' : 'hover:text-primary'}`}>
                  Продавцы
                </button>
                <button onClick={() => setActiveSection('ratings')} className={`text-sm font-medium transition-colors ${activeSection === 'ratings' ? 'text-primary' : 'hover:text-primary'}`}>
                  Рейтинги
                </button>
                <button onClick={() => setActiveSection('support')} className={`text-sm font-medium transition-colors ${activeSection === 'support' ? 'text-primary' : 'hover:text-primary'}`}>
                  Поддержка
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block relative w-64">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (activeSection !== 'catalog') setActiveSection('catalog'); }} placeholder="Поиск..." className="pl-10" />
              </div>
              
              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-xs flex items-center justify-center text-background font-semibold">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingCart" className="mx-auto mb-4 text-muted-foreground" size={64} />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cartItems.map((item) => (
                            <Card key={item.id} className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <Badge variant="secondary" className="mb-2 bg-secondary/20 text-secondary border-secondary/30">
                                    {item.game}
                                  </Badge>
                                  <h4 className="font-bold">{item.title}</h4>
                                  <p className="text-primary font-bold mt-1">{item.price} ₽</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                  <Icon name="X" size={18} />
                                </Button>
                              </div>
                              <div className="flex items-center gap-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal} ₽</span>
                          </div>
                          <Button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                            <Icon name="CreditCard" className="mr-2" size={20} />
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Оформление заказа</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div>
                      <h4 className="font-semibold mb-3">Ваш заказ</h4>
                      <div className="space-y-2">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.title} x{item.quantity}</span>
                            <span className="font-semibold">{item.price * item.quantity} ₽</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span className="text-primary">{cartTotal} ₽</span>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 block">Способ оплаты</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Icon name="CreditCard" size={18} />
                              Банковская карта
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <RadioGroupItem value="sbp" id="sbp" />
                          <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Icon name="Smartphone" size={18} />
                              СБП (Система быстрых платежей)
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:border-primary">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Icon name="Bitcoin" size={18} />
                              Криптовалюта
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button onClick={completeOrder} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                      <Icon name="Check" className="mr-2" size={20} />
                      Оплатить {cartTotal} ₽
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {isLoggedIn ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Icon name="User" size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle className="text-2xl font-bold">Личный кабинет</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-6">
                      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                            <Icon name="User" size={32} className="text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </Card>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Мои заказы</h4>
                        {orders.map((order) => (
                          <Card key={order.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Badge variant="secondary" className="mb-1 bg-secondary/20 text-secondary border-secondary/30">
                                  {order.game}
                                </Badge>
                                <h5 className="font-semibold">{order.title}</h5>
                                <p className="text-sm text-muted-foreground">{order.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">{order.price} ₽</p>
                                <Badge className={order.status === 'Доставлено' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}>
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Settings" className="mr-2" size={18} />
                          Настройки профиля
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Wallet" className="mr-2" size={18} />
                          Мой кошелёк
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => { setIsLoggedIn(false); toast({ title: "Вы вышли из аккаунта" }); }}>
                          <Icon name="LogOut" className="mr-2" size={18} />
                          Выйти
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Icon name="User" size={20} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center">Добро пожаловать!</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="mt-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input id="login-email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Input id="login-password" type="password" placeholder="••••••••" />
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                          onClick={() => { handleLogin('user@example.com', 'password'); }}
                        >
                          Войти
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Имя</Label>
                          <Input id="register-name" placeholder="Ваше имя" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input id="register-email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <Input id="register-password" type="password" placeholder="••••••••" />
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => { handleRegister('Новый пользователь', 'newuser@example.com', 'password'); }}
                        >
                          Зарегистрироваться
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && renderHome()}
        {activeSection === 'catalog' && renderCatalog()}
        {activeSection === 'sellers' && renderSellers()}
        {activeSection === 'ratings' && renderRatings()}
        {activeSection === 'support' && renderSupport()}
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameMarket
              </h4>
              <p className="text-sm text-muted-foreground">
                Безопасный маркетплейс игровых ценностей с защитой сделок
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Маркетплейс</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('sellers')} className="hover:text-primary transition-colors">Продавцы</button></li>
                <li><button onClick={() => setActiveSection('ratings')} className="hover:text-primary transition-colors">Рейтинги</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveSection('support')} className="hover:text-primary transition-colors">Поддержка</button></li>
                <li><button className="hover:text-primary transition-colors">FAQ</button></li>
                <li><button className="hover:text-primary transition-colors">Правила</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@gamemarket.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Telegram чат
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 GameMarket. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
