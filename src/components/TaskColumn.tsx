
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "@/context/TaskContext";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskColumnProps {
  title: string;
  id: string;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskColumn = ({
  title,
  id,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) => {
  // Get column color based on id
  const getColumnColor = () => {
    switch(id) {
      case "todo":
        return "bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent";
      case "inProgress":
        return "bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-900/20 dark:to-transparent";
      case "done":
        return "bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent";
      default:
        return "";
    }
  };
  
  return (
    <div className={cn(
      "flex h-full min-h-[500px] w-full min-w-[280px] flex-col rounded-md border bg-card p-2 shadow-sm",
      getColumnColor()
    )}>
      <div className="mb-3 flex items-center justify-between px-2">
        <h2 className="font-semibold">
          <span>{title}</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {tasks.length}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1 text-xs"
            onClick={onAddTask}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={cn(
              "flex-1 rounded-md p-1 transition-colors",
              snapshot.isDraggingOver && "bg-accent/50 backdrop-blur-sm"
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="flex h-full min-h-[100px] items-center justify-center rounded-md border border-dashed border-muted p-4 text-center text-sm text-muted-foreground">
                <div className="max-w-[160px]">
                  <p>No tasks yet</p>
                  <Button
                    variant="ghost" 
                    size="sm"
                    className="mt-2" 
                    onClick={onAddTask}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add task
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
