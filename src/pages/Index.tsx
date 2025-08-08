import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceGrid, type Workspace } from "@/components/workspace/WorkspaceGrid";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// URL da sua API n8n para listar workspaces.
// Certifique-se de que esta é a URL de PRODUÇÃO, não a de teste.
const WORKSPACES_API_URL = "https://n8nprod.ifpvps.com/webhook/workspaces";
const CREATE_WORKSPACE_API_URL = "https://n8nprod.ifpvps.com/webhook/workspace";


const Workspaces = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Função para buscar os dados da API
  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(WORKSPACES_API_URL);
      if (!response.ok) {
        throw new Error("Falha ao buscar os workspaces.");
      }
      const data = await response.json();
      
      // Mapeia os dados da API para o formato que o componente espera
      const formattedData = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.nome_workspace,
        instanceCount: item.instance_count || 0, // Assumindo que a API pode não retornar isso ainda
        createdAt: format(new Date(item.created_at), "dd 'de' MMM, yyyy", {
          locale: ptBR,
        }),
      }));

      setWorkspaces(formattedData);
      
    } catch (error) {
      console.error("Erro ao carregar workspaces:", error);
      toast({
        title: "Erro de Rede",
        description: "Não foi possível carregar os workspaces. Verifique sua conexão ou a API.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para chamar a função de busca quando a página carrega
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleCreateWorkspace = async (name: string) => {
    try {
      const response = await fetch(CREATE_WORKSPACE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_workspace: name }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o workspace.");
      }

      toast({
        title: "Workspace criado",
        description: `O workspace "${name}" foi criado com sucesso.`,
      });
      
      // Atualiza a lista de workspaces para mostrar o novo item
      fetchWorkspaces();

    } catch (error) {
      console.error("Erro ao criar workspace:", error);
      toast({
        title: "Erro ao Criar",
        description: "Não foi possível criar o workspace.",
        variant: "destructive",
      });
    }
  };

  const handleWorkspaceClick = (workspace: Workspace) => {
    navigate(`/workspaces/${workspace.id}`);
  };

  const handleEditWorkspace = (workspace: Workspace) => {
    toast({
      title: "Editar workspace",
      description: `Funcionalidade de edição para ${workspace.name} será implementada.`,
    });
  };

  const handleDeleteWorkspace = (workspace: Workspace) => {
    // Aqui virá a chamada para a API de exclusão no futuro
    setWorkspaces(prev => prev.filter(w => w.id !== workspace.id));
    
    toast({
      title: "Workspace excluído (localmente)",
      description: `O workspace "${workspace.name}" foi excluído da visualização.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Workspaces</h1>
          <p className="text-text-secondary mt-1">
            Organize suas instâncias por cliente ou projeto
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md h-10 px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
          Novo Workspace
        </button>
      </div>
      
      <WorkspaceGrid
        workspaces={workspaces}
        isLoading={isLoading}
        onWorkspaceClick={handleWorkspaceClick}
        onEditWorkspace={handleEditWorkspace}
        onDeleteWorkspace={handleDeleteWorkspace}
        onCreateWorkspace={() => setIsModalOpen(true)}
      />

      <CreateWorkspaceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>
  );
};

export default Workspaces;