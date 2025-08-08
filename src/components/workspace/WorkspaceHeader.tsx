import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceHeaderProps {
  onCreateWorkspace: () => void;
}

export const WorkspaceHeader = ({ onCreateWorkspace }: WorkspaceHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Workspaces
          </h1>
        </div>
        
        <Button onClick={onCreateWorkspace} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Workspace
        </Button>
      </div>
    </header>
  );
};