import { Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceEmptyStateProps {
  onCreateWorkspace: () => void;
}

export const WorkspaceEmptyState = ({ onCreateWorkspace }: WorkspaceEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <FolderPlus className="h-8 w-8 text-text-muted" />
        </div>
      </div>
      
      <div className="mb-8 max-w-md">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Crie seu primeiro Workspace
        </h2>
        <p className="text-text-secondary">
          Workspaces ajudam a organizar suas instâncias por cliente ou projeto.
        </p>
      </div>
      
      <Button 
        onClick={onCreateWorkspace}
        size="lg"
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Criar seu primeiro Workspace
      </Button>
    </div>
  );
};