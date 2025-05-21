
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
  return (
    <div className="flex h-full min-h-[500px] w-full min-w-[280px] flex-col rounded-md bg-muted/40 p-2">
      <div className="mb-3 flex items-center justify-between px-2">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex items-center">
          <span className="mr-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {tasks.length}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={onAddTask}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={cn(
              "task-column flex-1 rounded-md p-1 transition-colors",
              snapshot.isDraggingOver && "is-dragging-over"
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
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
