
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { formatDate, isOverdue } from "@/utils/dateUtils";
import { Task } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate);
  
  // Get priority style
  const getPriorityStyle = () => {
    if (task.status === "done") return "";
    
    if (isTaskOverdue) {
      return "border-l-4 border-l-destructive";
    }
    return "";
  };

  const getStatusColor = () => {
    switch(task.status) {
      case "todo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "inProgress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "";
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          className={cn(
            "mb-3 overflow-hidden transition-all",
            snapshot.isDragging && "rotate-1 scale-105 shadow-lg",
            getPriorityStyle()
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{task.title}</h3>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-muted"
                  onClick={() => onEdit(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {task.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {task.dueDate && (
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs",
                    isTaskOverdue && task.status !== "done" ? "bg-destructive/10 text-destructive" : ""
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </span>
              )}

              <span className={cn("rounded-full px-2 py-1 text-xs", getStatusColor())}>
                {task.status === "todo" 
                  ? "To Do" 
                  : task.status === "inProgress" 
                  ? "In Progress" 
                  : "Done"}
              </span>
              
              {task.createdAt && (
                <span className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </span>
              )}
            </div>
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
