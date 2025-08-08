import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceGrid, type Workspace } from "@/components/workspace/WorkspaceGrid";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Projeto IFP",
    instanceCount: 5,
    createdAt: "08 de ago, 2025",
  },
  {
    id: "2",
    name: "Cliente Varejo ABC",
    instanceCount: 3,
    createdAt: "05 de ago, 2025",
  },
  {
    id: "3",
    name: "Campanha Marketing",
    instanceCount: 8,
    createdAt: "02 de ago, 2025",
  },
  {
    id: "4",
    name: "Suporte Técnico",
    instanceCount: 12,
    createdAt: "28 de jul, 2025",
  },
];

const Workspaces = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Simulate API loading
  useEffect(() => {
    const loadWorkspaces = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setWorkspaces(mockWorkspaces);
      setIsLoading(false);
    };

    loadWorkspaces();
  }, []);

  const handleCreateWorkspace = async (name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name,
      instanceCount: 0,
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setWorkspaces(prev => [newWorkspace, ...prev]);
    
    toast({
      title: "Workspace criado",
      description: `O workspace "${name}" foi criado com sucesso.`,
    });
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
    setWorkspaces(prev => prev.filter(w => w.id !== workspace.id));
    
    toast({
      title: "Workspace excluído",
      description: `O workspace "${workspace.name}" foi excluído.`,
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