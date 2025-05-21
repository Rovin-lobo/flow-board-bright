
/**
 * Checks if a task is overdue based on its due date
 */
export const isOverdue = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  
  const taskDueDate = new Date(dueDate);
  taskDueDate.setHours(0, 0, 0, 0); // Reset time to start of day
  
  return taskDueDate < today;
};

/**
 * Format a date string to display format (e.g., "May 21, 2025")
 */
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "No due date";
  
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
