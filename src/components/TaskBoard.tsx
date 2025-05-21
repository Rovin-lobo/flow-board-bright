
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task, TaskStatus, useTasks } from "@/context/TaskContext";
import TaskColumn from "./TaskColumn";
import TaskDialog from "./TaskDialog";
import { useToast } from "@/hooks/use-toast";

const TaskBoard = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getColumnTasks,
  } = useTasks();
  
  const { toast } = useToast();
  
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [addToStatus, setAddToStatus] = useState<TaskStatus>("todo");

  // Open the dialog to add a new task
  const handleAddTask = (status: TaskStatus) => {
    setAddToStatus(status);
    setEditingTask(undefined);
    setIsTaskDialogOpen(true);
  };

  // Open the dialog to edit an existing task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move to a different column
    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId as TaskStatus;
      moveTask(draggableId, newStatus);
      
      toast({
        title: "Task moved",
        description: `Task moved to ${
          newStatus === "todo"
            ? "To Do"
            : newStatus === "inProgress"
            ? "In Progress"
            : "Done"
        }`,
      });
    }
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      // Update existing task
      updateTask({
        ...editingTask,
        ...taskData,
      });
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    } else {
      // Add new task with the selected status
      addTask({
        ...taskData,
        status: addToStatus,
      });
      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      });
    }
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task deleted",
      description: "Your task has been deleted.",
      variant: "destructive",
    });
  };

  // Get tasks for each column
  const todoTasks = getColumnTasks("todo");
  const inProgressTasks = getColumnTasks("inProgress");
  const doneTasks = getColumnTasks("done");

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TaskColumn
            title="To Do"
            id="todo"
            tasks={todoTasks}
            onAddTask={() => handleAddTask("todo")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            title="In Progress"
            id="inProgress"
            tasks={inProgressTasks}
            onAddTask={() => handleAddTask("inProgress")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            title="Done"
            id="done"
            tasks={doneTasks}
            onAddTask={() => handleAddTask("done")}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </DragDropContext>
      
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </>
  );
};

export default TaskBoard;
