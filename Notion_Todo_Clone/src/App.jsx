import { useState } from 'react';
import Modal from 'react-modal';
import './style.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectName = e.target.elements.projName.value;
    setProjects([...projects, newProjectName]);
    setProjectName('');
    setIsModalOpen(false);
  };

  const handleTaskSubmit = (e) => {

    switch (task.currentStatus) {
      case "Not Started":
        task.currentStatus = "Not Started";
        break;
      case "In Progress":
        task.currentStatus = "In Progress";
        break;
      case "Completed":
        task.currentStatus = "Completed";
        break;
      default:
        task.currentStatus = "Not Started";
        break;
    }
    
    e.preventDefault();
    const newTaskName = e.target.elements.taskName.value;
    const newTaskDescription = e.target.elements.taskDescription.value;
    const newTaskDueDate = e.target.elements.taskDueDate.value;
    const newTaskPriority = e.target.elements.taskPriority.value;
    const newTaskCurrentStatus = e.target.elements.taskCurrentStatus.value;
    const newTask = new Task(newTaskName, newTaskDescription, newTaskCurrentStatus, newTaskDueDate, newTaskPriority);
    setProjects([...projects, newTask]);
    setProjectName('');
    setIsModalOpen(false);
  }

  return (
    <>
      <Sidebar handleModalOpen={handleModalOpen} projects={projects} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Project Modal"
        id='projModal'
      >
        <ProjForm handleSubmit={handleSubmit} handleModalClose={handleModalClose} />
      </Modal>
      <MainContent/>
    </>
  );
}

function ProjForm({ handleSubmit, handleModalClose }) {
  const [projectName, setProjectName] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <div className="entry">
        <label htmlFor="projName">Project Name</label>
        <input
          type="text"
          id="projName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="submit-n-cancel">
        <button id="cancel" onClick={handleModalClose}>
          Cancel
        </button>
        <button type="submit" id="submit">
          Submit
        </button>
      </div>
    </form>
  );
}


function Sidebar({ handleModalOpen, projects }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Projects</h1>
      </div>
      <Projects projects={projects} />
      <div className="add-project">
        <button id="projBtn" onClick={handleModalOpen}>
          Add Project
        </button>
      </div>
    </div>
  );
}

function Projects({ projects }) {
  return (
    <div className="projects">
      {projects.map((project, index) => (
        <div key={index}>{project}</div>
      ))}
    </div>
  );
}

function AddTask({ handleTaskSubmit, handleModalClose }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className='add-header'>
      <h2 id='addTask' onClick={handleToggleForm}>
        Add Task
      </h2>
      <Modal
        isOpen={isFormOpen}
        onRequestClose={handleModalClose}
        contentLabel='Task Modal'
        className='task-modal'
      >
        <TaskForm handleTaskSubmit={handleTaskSubmit} handleModalClose={handleModalClose} />
      </Modal>
      <hr />
    </div>
  );
}


function TaskForm({ handleTaskSubmit, handleModalClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState('');
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      currentStatus,
      dueDate,
      priority
    };
    handleTaskSubmit(task);
    setTitle("");
    setDescription("");
    setCurrentStatus("");
    setDueDate("");
    setPriority("");
    handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="entry">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="entry">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="entry">
        <label htmlFor="currentStatus">Current Status</label>
        <select value={currentStatus} onChange={handleChange}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="entry">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="entry">
        <label htmlFor="priority">Priority</label>
        <input
          type="text"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </div>
      <div className="submit-n-cancel">
        <button id="cancel" onClick={handleModalClose}>
          Cancel
        </button>
        <button type="submit" id="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

function Kanban({ notStartedTasks, inProgressTasks, completedTasks }) {
  return(
    <div className='kanban'>
      <div className="pre-task">
        <p>Haven't Started</p>
        <hr className='progress-line'/>
        {notStartedTasks.map((task, index) => (
          <TaskCard key={index} {...task}/>
        ))}
      </div>
      <div className="in-progress">
        <p>In Progress</p>
        <hr className='progress-line'/>
        {inProgressTasks.map((task, index) => (
          <TaskCard key={index} {...task}/>
        ))}
      </div>
      <div className="completed">
        <p>Completed</p>
        <hr className='progress-line'/>
        {completedTasks.map((task, index) => (
          <TaskCard key={index} {...task}/>
        ))}
      </div>
    </div>
  )
}

function MainContent() {
  const [notStartedTasks, setNotStartedTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <div>
      <AddTask
        handleTaskSubmit={(task) => {
          switch (task.currentStatus) {
            case "Not Started":
              setNotStartedTasks([...notStartedTasks, task]);
              break;
            case "In Progress":
              setInProgressTasks([...inProgressTasks, task]);
              break;
            case "Completed":
              setCompletedTasks([...completedTasks, task]);
              break;
            default:
              break;
          }
        }}
      />
      <Kanban
        notStartedTasks={notStartedTasks}
        inProgressTasks={inProgressTasks}
        completedTasks={completedTasks}
      />
    </div>
  );
}


function TaskCard({title, description, currentStatus, dueDate, priority}){
// if the currentStatus is inProgress, append the card to the inProgress div

  return (
    <div className='task-card'>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>

  )
}
export default App;
