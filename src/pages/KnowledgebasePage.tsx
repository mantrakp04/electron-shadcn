import React from "react";
import { database } from "@/helpers/db";
import { knowledgebase } from "@/helpers/ipc/api/db/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function KnowledgebasePage() {
  const { data, refetch } = useQuery({
    queryKey: ["knowledgebases"],
    queryFn: async () => {
      try {
        const result = await database.select().from(knowledgebase).all();
        return result;
      } catch (error) {
        console.error("Failed to fetch knowledgebases:", error);
        throw error; // Re-throw the error so react-query can handle it
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const [newKb] = await database
          .insert(knowledgebase)
          .values({
            name: values.name,
            created_at: new Date().toISOString(),
          })
          .returning();
        return newKb;
      } catch (error) {
        console.error("Failed to create knowledgebase:", error);
        throw error; // Re-throw the error so react-query can handle it
      }
    },
    onSuccess: () => {
      toast.success("Knowledge base created");
      refetch();
      form.reset();
    },
    onError: (error) => {
      console.error("Failed to create knowledgebase on client:", error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await database.delete(knowledgebase).where(eq(knowledgebase.id, id));
      } catch (error) {
        console.error("Failed to delete knowledgebase:", error);
        throw error; // Re-throw the error so react-query can handle it
      }
    },
    onSuccess: () => {
      toast.success("Knowledge base deleted");
      refetch();
    },
    onError: (error) => {
      console.error("Failed to delete knowledgebase on client:", error);
    }
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Knowledge Bases</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Knowledge Base</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => createMutation.mutate(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={createMutation.isPending}>
                  Create
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((kb) => (
            <TableRow key={kb.id}>
              <TableCell className="font-medium">{kb.name}</TableCell>
              <TableCell>
                {format(new Date(kb.created_at), "PPpp")}
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the knowledge base.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(kb.id)}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}