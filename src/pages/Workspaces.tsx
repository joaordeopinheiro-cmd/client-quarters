import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceGrid, type Workspace } from "@/components/workspace/WorkspaceGrid";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- URLs da sua API n8n (use as URLs de PRODUÇÃO) ---
const WORKSPACES_API_URL = "https://n8nprod.ifpvps.com/webhook/workspaces";
const CREATE_WORKSPACE_API_URL = "https://n8nprod.ifpvps.com/webhook/workspace";
// ---------------------------------------------------------

const Workspaces = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Função para buscar os workspaces da sua API
  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(WORKSPACES_API_URL);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      const