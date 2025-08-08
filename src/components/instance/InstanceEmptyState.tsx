import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstanceEmptyStateProps {
  onCreateInstance: () => void;
}

export const InstanceEmptyState = ({ onCreateInstance }: InstanceEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-text-muted" />
        </div>
      </div>
      
      <div className="mb-8 max-w-md">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Crie sua primeira Instância
        </h2>
        <p className="text-text-secondary">
          Instâncias são conexões individuais do WhatsApp que você pode gerenciar de forma independente.
        </p>
      </div>
      
      <Button 
        onClick={onCreateInstance}
        size="lg"
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Criar primeira Instância
      </Button>
    </div>
  );
};