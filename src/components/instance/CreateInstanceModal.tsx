import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateInstanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInstance: (data: { name: string; phoneNumber: string }) => void;
}

export const CreateInstanceModal = ({
  open,
  onOpenChange,
  onCreateInstance,
}: CreateInstanceModalProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) return;

    setIsCreating(true);
    try {
      await onCreateInstance({ 
        name: name.trim(), 
        phoneNumber: phoneNumber.trim() 
      });
      setName("");
      setPhoneNumber("");
      onOpenChange(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setName("");
      setPhoneNumber("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Criar Nova Instância
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            Configure uma nova instância do WhatsApp para este workspace.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-text-primary">
                Nome da Instância
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Atendimento Geral"
                className="focus-ring"
                disabled={isCreating}
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-text-primary">
                Número do WhatsApp
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ex: +55 11 99999-0000"
                className="focus-ring"
                disabled={isCreating}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || !phoneNumber.trim() || isCreating}
              className="gap-2"
            >
              {isCreating ? "Criando..." : "Criar Instância"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};