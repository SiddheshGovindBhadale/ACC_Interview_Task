import { ToastAndroid } from "react-native";

export const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};


export const editTask = (Data) => {

}



const updateTask = () => {
    const newTasks = tasks.map((t) =>
      t.id === editingTaskId ? { id: t.id, name: task } : t
    );
    setTasks(newTasks);
    saveTasks(newTasks);
    setTask('');
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };