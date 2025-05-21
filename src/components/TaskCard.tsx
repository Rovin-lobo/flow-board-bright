
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { formatDate, isOverdue } from "@/utils/dateUtils";
import { Task } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={cn(
            "task-card bg-card mb-3 rounded-md border p-4 shadow-sm transition-all",
            snapshot.isDragging && "is-dragging",
            isTaskOverdue && task.status !== "done" && "border-destructive"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{task.title}</h3>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
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

          {task.dueDate && (
            <div
              className={cn(
                "mt-3 flex items-center text-xs",
                isTaskOverdue && task.status !== "done"
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              <Calendar className="mr-1 h-3 w-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
