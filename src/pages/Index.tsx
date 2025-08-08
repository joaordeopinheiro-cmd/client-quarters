import { useState, useEffect } from "react";
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

const Index = () => {
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
    toast({
      title: "Abrindo workspace",
      description: `Redirecionando para ${workspace.name}...`,
    });
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
    <div className="min-h-screen bg-background">
      <WorkspaceHeader onCreateWorkspace={() => setIsModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <WorkspaceGrid
          workspaces={workspaces}
          isLoading={isLoading}
          onWorkspaceClick={handleWorkspaceClick}
          onEditWorkspace={handleEditWorkspace}
          onDeleteWorkspace={handleDeleteWorkspace}
          onCreateWorkspace={() => setIsModalOpen(true)}
        />
      </main>

      <CreateWorkspaceModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>
  );
};

export default Index;
