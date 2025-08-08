import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateInstanceModal } from "@/components/instance/CreateInstanceModal";
import { InstanceCard } from "@/components/instance/InstanceCard";
import { InstanceCardSkeleton } from "@/components/instance/InstanceCardSkeleton";
import { InstanceEmptyState } from "@/components/instance/InstanceEmptyState";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface Instance {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting";
  createdAt: string;
  lastActivity: string;
  qrCode?: string;
}

// --- URLs da sua API n8n (use as URLs de PRODUÇÃO) ---
const INSTANCES_API_URL = "https://n8nprod.ifpvps.com/webhook/instancias"; // A URL base para listar
const CREATE_INSTANCE_API_URL = "https://n8nprod.ifpvps.com/webhook/instancia";
// ---------------------------------------------------------

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Carregando..."); // Nome do workspace
  const { toast } = useToast();

  useEffect(() => {
    const loadWorkspaceData = async () => {
      if (!workspaceId) return;

      setIsLoading(true);
      try {
        // Busca as instâncias do workspace específico
        const response = await fetch(`${INSTANCES_API_URL}?workspaceId=${workspaceId}`);
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("A resposta da API não é uma lista:", data);
            throw new Error("Formato de dados inesperado da API.");
        }

        const formattedData = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.nome_instancia,
          phoneNumber: item.numero_telefone || "Não conectado",
          status: (item.status_whatsapp?.toLowerCase() || "disconnected") as Instance['status'],
          createdAt: format(new Date(item.created_at), "dd 'de' MMM, yyyy", { locale: ptBR }),
          lastActivity: "A implementar", // Este dado virá da API no futuro
        }));
        
        setInstances(formattedData);

        // (Opcional) No futuro, você pode buscar o nome do workspace de outra API
        // Por agora, vamos manter um nome genérico ou o ID.
        setWorkspaceName(`Workspace #${workspaceId}`);

      } catch (error) {
        console.error("Erro ao carregar dados do workspace:", error);
        toast({
          title: "Erro de Rede",
          description: "Não foi possível carregar as instâncias deste workspace.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkspaceData();
  }, [workspaceId, toast]);

  const handleCreateInstance = async (data: { name: string; phoneNumber: string }) => {
    if (!workspaceId) return;

    try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulação de delay
        
        const response = await fetch(CREATE_INSTANCE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome_instancia: data.name,
                workspace_id: parseInt(workspaceId, 10), // Garante que o ID seja um número
            })
        });

        if (!response.ok) {
            throw new Error("Falha ao criar a instância.");
        }

        toast({
            title: "Instância criada",
            description: `A instância "${data.name}" foi criada com sucesso.`,
        });

        // Recarrega a lista para mostrar a nova instância
        // Adicionando um pequeno delay para o n8n processar
        setTimeout(() => {
            const event = new Event('workspacesChanged');
            window.dispatchEvent(event);
        }, 1000);

    } catch(error) {
        console.error("Erro ao criar instância:", error);
        toast({
            title: "Erro ao Criar",
            description: "Não foi possível criar a instância.",
            variant: "destructive",
        });
    }
  };
  
    useEffect(() => {
        const reloadData = () => {
            // A função já está sendo chamada pelo useEffect principal,
            // mas podemos forçar um reload aqui se necessário.
            if (workspaceId) {
                // Re-chama a função de carregar dados
                (async () => {
                    await new Promise(resolve => setTimeout(resolve, 500)); // pequeno delay
                    const loadWorkspaceData = async () => {
      if (!workspaceId) return;

      setIsLoading(true);
      try {
        // Busca as instâncias do workspace específico
        const response = await fetch(`${INSTANCES_API_URL}?workspaceId=${workspaceId}`);
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("A resposta da API não é uma lista:", data);
            throw new Error("Formato de dados inesperado da API.");
        }

        const formattedData = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.nome_instancia,
          phoneNumber: item.numero_telefone || "Não conectado",
          status: (item.status_whatsapp?.toLowerCase() || "disconnected") as Instance['status'],
          createdAt: format(new Date(item.created_at), "dd 'de' MMM, yyyy", { locale: ptBR }),
          lastActivity: "A implementar", // Este dado virá da API no futuro
        }));
        
        setInstances(formattedData);

        // (Opcional) No futuro, você pode buscar o nome do workspace de outra API
        // Por agora, vamos manter um nome genérico ou o ID.
        setWorkspaceName(`Workspace #${workspaceId}`);

      } catch (error) {
        console.error("Erro ao carregar dados do workspace:", error);
        toast({
          title: "Erro de Rede",
          description: "Não foi possível carregar as instâncias deste workspace.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkspaceData();
                })();
            }
        };

        window.addEventListener('workspacesChanged', reloadData);

        return () => {
            window.removeEventListener('workspacesChanged', reloadData);
        };
    }, [workspaceId]);

  const handleInstanceClick = (instance: Instance) => {
    navigate(`/workspaces/${workspaceId}/instances/${instance.id}`);
  };

  const handleDeleteInstance = (instance: Instance) => {
    setInstances(prev => prev.filter(i => i.id !== instance.id));
    
    toast({
      title: "Instância excluída (localmente)",
      description: `A instância "${instance.name}" foi removida da tela.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx_auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/workspaces")}
            className="mb-4 p-0 h-auto text-text-secondary hover:text-text-primary"
          >
            ← Voltar para Workspaces
          </Button>
          <h1 className="text-3xl font-bold text-text-primary">{workspaceName}</h1>
          <p className="text-text-secondary mt-1">
            Gerencie as instâncias do WhatsApp deste workspace
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Instância
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <InstanceCardSkeleton key={index} />
          ))}
        </div>
      ) : instances.length === 0 ? (
        <InstanceEmptyState onCreateInstance={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instances.map((instance) => (
            <InstanceCard
              key={instance.id}
              {...instance}
              onClick={() => handleInstanceClick(instance)}
              onDelete={() => handleDeleteInstance(instance)}
            />
          ))}
        </div>
      )}

      <CreateInstanceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateInstance={handleCreateInstance}
      />
    </div>
  );
};

export default WorkspaceDetail;