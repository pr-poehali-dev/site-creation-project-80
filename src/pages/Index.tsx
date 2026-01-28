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
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
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
    { id: 1, game: 'Dota 2', title: '1000 MMR', price: 2500, seller: 'ProGamer123', rating: 4.9, sales: 523 },
    { id: 2, game: 'CS2', title: 'Аккаунт Prime', price: 1200, seller: 'GameMaster', rating: 5.0, sales: 892 },
    { id: 3, game: 'Valorant', title: '1000 VP', price: 800, seller: 'ShopKing', rating: 4.8, sales: 234 },
    { id: 4, game: 'Fortnite', title: '5000 V-Bucks', price: 3200, seller: 'EpicStore', rating: 4.9, sales: 1243 },
    { id: 5, game: 'League of Legends', title: 'Аккаунт Gold', price: 1500, seller: 'LeagueKing', rating: 4.7, sales: 345 },
    { id: 6, game: 'Apex Legends', title: '2000 Coins', price: 1100, seller: 'ApexPro', rating: 4.9, sales: 678 },
  ];

  const orders = [
    { id: 1, game: 'Valorant', title: '1000 VP', price: 800, date: '25.01.2024', status: 'Доставлено' },
    { id: 2, game: 'Dota 2', title: '500 MMR', price: 1200, date: '23.01.2024', status: 'В обработке' },
  ];

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUser({ name: email.split('@')[0], email });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true);
    setUser({ name, email });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                GameMarket
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
                  Главная
                </button>
                <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
                  Каталог
                </button>
                <button onClick={() => setActiveSection('sellers')} className="text-sm font-medium hover:text-primary transition-colors">
                  Продавцы
                </button>
                <button onClick={() => setActiveSection('ratings')} className="text-sm font-medium hover:text-primary transition-colors">
                  Рейтинги
                </button>
                <button onClick={() => setActiveSection('support')} className="text-sm font-medium hover:text-primary transition-colors">
                  Поддержка
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block relative w-64">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Поиск..." className="pl-10" />
              </div>
              
              <Sheet>
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
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                            <Icon name="CreditCard" className="mr-2" size={20} />
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

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
                        <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => setIsLoggedIn(false)}>
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
                          onClick={() => handleLogin('user@example.com', 'password')}
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
                          onClick={() => handleRegister('Новый пользователь', 'newuser@example.com', 'password')}
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
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                Смотреть все
                <Icon name="ArrowRight" className="ml-2" size={18} />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="group cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20 border-border bg-card">
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" className="mr-2" size={16} />
                  Фильтры
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ArrowUpDown" className="mr-2" size={16} />
                  Сортировка
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
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
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
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
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Продавцы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рейтинги</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
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
