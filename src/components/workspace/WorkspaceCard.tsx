import { MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkspaceCardProps {
  id: string;
  name: string;
  instanceCount: number;
  createdAt: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const WorkspaceCard = ({
  name,
  instanceCount,
  createdAt,
  onClick,
  onEdit,
  onDelete,
}: WorkspaceCardProps) => {
  return (
    <div
      className="workspace-card group relative bg-card border border-card-border rounded-lg p-6 cursor-pointer focus-ring"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Action Menu */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-destructive focus:text-destructive"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary leading-tight">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-text-muted" />
          <span className="text-sm font-medium text-text-secondary">
            {instanceCount} Instâncias
          </span>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-text-muted">
            Criado em {createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};