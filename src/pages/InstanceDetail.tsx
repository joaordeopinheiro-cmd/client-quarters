import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, QrCode, Copy, RefreshCw, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface InstanceDetail {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting";
  createdAt: string;
  lastActivity: string;
  qrCode: string;
  webhookUrl: string;
  apiKey: string;
}

const statusConfig = {
  connected: {
    label: "Conectado",
    color: "bg-primary text-primary-foreground",
    icon: "text-primary",
  },
  disconnected: {
    label: "Desconectado", 
    color: "bg-destructive text-destructive-foreground",
    icon: "text-destructive",
  },
  connecting: {
    label: "Conectando",
    color: "bg-orange-500 text-white",
    icon: "text-orange-500",
  },
};

const InstanceDetail = () => {
  const { workspaceId, instanceId } = useParams();
  const navigate = useNavigate();
  const [instance, setInstance] = useState<InstanceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadInstanceData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock instance data
      const mockInstance: InstanceDetail = {
        id: instanceId || "",
        name: "Atendimento Geral",
        phoneNumber: "+55 11 99999-0001",
        status: "connecting",
        createdAt: "08 de ago, 2025",
        lastActivity: "2 min atrás",
        qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNPREUgUVI8L3RleHQ+Cjwvc3ZnPg==",
        webhookUrl: "https://api.example.com/webhook/instance-123",
        apiKey: "sk_test_123456789abcdef",
      };
      
      setInstance(mockInstance);
      setIsLoading(false);
    };

    loadInstanceData();
  }, [instanceId]);

  const handleGenerateQR = async () => {
    setIsGeneratingQR(true);
    // Simulate QR generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "QR Code gerado",
      description: "Escaneie o QR code com seu WhatsApp para conectar.",
    });
    
    setIsGeneratingQR(false);
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência.`,
    });
  };

  if (isLoading || !instance) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = statusConfig[instance.status];

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/workspaces/${workspaceId}`)}
          className="mb-4 p-0 h-auto text-text-secondary hover:text-text-primary"
        >
          ← Voltar para Instâncias
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{instance.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <span className="text-text-secondary">{instance.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className={`h-2 w-2 fill-current ${statusInfo.icon}`} />
                <Badge className={statusInfo.color}>
                  {statusInfo.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code de Conexão
            </CardTitle>
            <CardDescription>
              Escaneie este código QR com seu WhatsApp para conectar a instância
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-4 bg-muted rounded-lg">
              <img 
                src={instance.qrCode} 
                alt="QR Code" 
                className="w-48 h-48 border-2 border-border rounded"
              />
            </div>
            
            <Button 
              onClick={handleGenerateQR}
              disabled={isGeneratingQR}
              className="w-full gap-2"
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 ${isGeneratingQR ? 'animate-spin' : ''}`} />
              {isGeneratingQR ? "Gerando..." : "Gerar Novo QR"}
            </Button>
          </CardContent>
        </Card>

        {/* Instance Details Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Instância</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Nome</label>
                <p className="text-text-primary">{instance.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Número</label>
                <p className="text-text-primary">{instance.phoneNumber}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Criado em</label>
                <p className="text-text-primary">{instance.createdAt}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Última atividade</label>
                <p className="text-text-primary">{instance.lastActivity}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações da API</CardTitle>
              <CardDescription>
                Use essas informações para integrar com sua aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Webhook URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                    {instance.webhookUrl}
                  </code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCopyToClipboard(instance.webhookUrl, "Webhook URL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">API Key</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                    {instance.apiKey}
                  </code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCopyToClipboard(instance.apiKey, "API Key")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstanceDetail;