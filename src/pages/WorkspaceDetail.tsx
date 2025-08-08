import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInstanceModal } from "@/components/instance/CreateInstanceModal";
import { InstanceCard } from "@/components/instance/InstanceCard";
import { InstanceCardSkeleton } from "@/components/instance/InstanceCardSkeleton";
import { InstanceEmptyState } from "@/components/instance/InstanceEmptyState";
import { useToast } from "@/hooks/use-toast";

export interface Instance {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting";
  createdAt: string;
  lastActivity: string;
  qrCode?: string;
}

// Mock data
const mockInstances: Instance[] = [
  {
    id: "1",
    name: "Atendimento Geral",
    phoneNumber: "+55 11 99999-0001",
    status: "connected",
    createdAt: "08 de ago, 2025",
    lastActivity: "2 min atrás",
  },
  {
    id: "2", 
    name: "Vendas",
    phoneNumber: "+55 11 99999-0002",
    status: "connecting",
    createdAt: "07 de ago, 2025",
    lastActivity: "5 min atrás",
  },
  {
    id: "3",
    name: "Suporte",
    phoneNumber: "+55 11 99999-0003", 
    status: "disconnected",
    createdAt: "06 de ago, 2025",
    lastActivity: "1 hora atrás",
  },
];

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadWorkspaceData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock workspace name based on ID
      const workspaceNames: Record<string, string> = {
        "1": "Projeto IFP",
        "2": "Cliente Varejo ABC", 
        "3": "Campanha Marketing",
        "4": "Suporte Técnico",
      };
      
      setWorkspaceName(workspaceNames[workspaceId || ""] || "Workspace");
      setInstances(mockInstances);
      setIsLoading(false);
    };

    loadWorkspaceData();
  }, [workspaceId]);

  const handleCreateInstance = async (data: { name: string; phoneNumber: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newInstance: Instance = {
      id: Date.now().toString(),
      name: data.name,
      phoneNumber: data.phoneNumber,
      status: "connecting",
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short', 
        year: 'numeric',
      }),
      lastActivity: "Agora",
    };

    setInstances(prev => [newInstance, ...prev]);
    
    toast({
      title: "Instância criada",
      description: `A instância "${data.name}" foi criada com sucesso.`,
    });
  };

  const handleInstanceClick = (instance: Instance) => {
    navigate(`/workspaces/${workspaceId}/instances/${instance.id}`);
  };

  const handleDeleteInstance = (instance: Instance) => {
    setInstances(prev => prev.filter(i => i.id !== instance.id));
    
    toast({
      title: "Instância excluída",
      description: `A instância "${instance.name}" foi excluída.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
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