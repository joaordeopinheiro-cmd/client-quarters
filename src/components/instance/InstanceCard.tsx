import { Phone, MoreVertical, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InstanceCardProps {
  id: string;
  name: string;
  phoneNumber: string;
  status: "connected" | "disconnected" | "connecting";
  createdAt: string;
  lastActivity: string;
  onClick: () => void;
  onDelete: () => void;
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

export const InstanceCard = ({
  name,
  phoneNumber,
  status,
  createdAt,
  lastActivity,
  onClick,
  onDelete,
}: InstanceCardProps) => {
  const statusInfo = statusConfig[status];

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
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary leading-tight">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Circle className={`h-2 w-2 fill-current ${statusInfo.icon}`} />
              <Badge className={statusInfo.color}>
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-text-muted" />
          <span className="text-sm font-medium text-text-secondary">
            {phoneNumber}
          </span>
        </div>

        <div className="space-y-1 pt-2 border-t border-border">
          <p className="text-xs text-text-muted">
            Criado em {createdAt}
          </p>
          <p className="text-xs text-text-muted">
            Última atividade: {lastActivity}
          </p>
        </div>
      </div>
    </div>
  );
};