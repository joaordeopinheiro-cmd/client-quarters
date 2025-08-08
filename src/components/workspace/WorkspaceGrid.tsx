import { WorkspaceCard } from "./WorkspaceCard";
import { WorkspaceCardSkeleton } from "./WorkspaceCardSkeleton";
import { WorkspaceEmptyState } from "./WorkspaceEmptyState";

export interface Workspace {
  id: string;
  name: string;
  instanceCount: number;
  createdAt: string;
}

interface WorkspaceGridProps {
  workspaces?: Workspace[];
  isLoading: boolean;
  onWorkspaceClick: (workspace: Workspace) => void;
  onEditWorkspace: (workspace: Workspace) => void;
  onDeleteWorkspace: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
}

export const WorkspaceGrid = ({
  workspaces,
  isLoading,
  onWorkspaceClick,
  onEditWorkspace,
  onDeleteWorkspace,
  onCreateWorkspace,
}: WorkspaceGridProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <WorkspaceCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!workspaces || workspaces.length === 0) {
    return <WorkspaceEmptyState onCreateWorkspace={onCreateWorkspace} />;
  }

  // Data state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          {...workspace}
          onClick={() => onWorkspaceClick(workspace)}
          onEdit={() => onEditWorkspace(workspace)}
          onDelete={() => onDeleteWorkspace(workspace)}
        />
      ))}
    </div>
  );
};