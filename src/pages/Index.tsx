import { useNavigate } from "react-router-dom";
import { BarChart3, Users, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total de Workspaces",
    value: "4",
    description: "Ativos no sistema",
    icon: Users,
    trend: "+2 este mês",
  },
  {
    title: "Instâncias Ativas",
    value: "12",
    description: "Conectadas e funcionando",
    icon: MessageSquare,
    trend: "+3 esta semana",
  },
  {
    title: "Mensagens Enviadas",
    value: "1,234",
    description: "Nas últimas 24h",
    icon: TrendingUp,
    trend: "+12% vs ontem",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-text-secondary">
          Visão geral da sua operação WhatsApp
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <p className="text-xs text-text-muted mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-primary font-medium mt-2">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Gerencie seus workspaces e instâncias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => navigate("/workspaces")}
              className="w-full justify-start"
              variant="outline"
            >
              Ver todos os Workspaces
            </Button>
            <Button 
              onClick={() => navigate("/workspaces")}
              className="w-full justify-start"
              variant="outline"
            >
              Criar novo Workspace
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Atividades</CardTitle>
            <CardDescription>
              Atividades recentes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Nova instância criada
                  </p>
                  <p className="text-xs text-text-muted">
                    Projeto IFP - Atendimento Geral
                  </p>
                </div>
                <span className="text-xs text-text-muted">2 min atrás</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Workspace atualizado
                  </p>
                  <p className="text-xs text-text-muted">
                    Cliente Varejo ABC
                  </p>
                </div>
                <span className="text-xs text-text-muted">1 hora atrás</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Instância conectada
                  </p>
                  <p className="text-xs text-text-muted">
                    Suporte Técnico - Vendas
                  </p>
                </div>
                <span className="text-xs text-text-muted">3 horas atrás</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
