import React from 'react'; 
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import LogInPage from './Page/LogIn/LogInPage.jsx';
import SignUpPage from './Page/SignUp/SignUpPage.jsx';
import AdminPage from './Page/Admin/AdminPage.jsx';
import TeamsPage from './Page/Teams/TeamsPage.jsx';
import ContactPage from './Page/Contact/ContactPage.jsx';
import EventPage from './Page/Event/EventPage.jsx';
import ClientPage from './Page/Client/ClientPage.jsx';
import UsersPage from './Page/Users/UsersPage.jsx';
import CreatTeamPage from './Page/Teams/CreatTeam/CreatTeamPage.jsx';
import CreateContactPage from './Page/Contact/CreateContact/CreateContactPage.jsx';
import TeamDetailsPage from './components/TeamDetails.jsx';
import CreatecCientPage from './Page/Client/CreatecCientPage/CreatecClientPage.jsx';
import ClientDetailsEditPage from './Page/Client/CreatecCientPage/EditClient/ClientDetailsEditPage.jsx';
import CreateEventPage from './Page/Event/CreateEventPage/CreateEventPage.jsx';
import EditEventPage from './Page/Event/CreateEventPage/EditEvent/EditEventPage.jsx';
import Home from './Page/Home/AllPage/Home.jsx';
import AllPage from './Page/Home/AllPage/AllPage.jsx';
import TheTeam from './Page/Home/AllPage/TheTeam.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
import { SearchProvider } from './components/SearchContext.jsx';
import ServicePage from './Page/Service/ServicePage.jsx';
import CreateServicePage from './Page/Service/CreateService/CreateServicePage.jsx';
import EditService from './Page/Service/CreateService/EditSevice/EditService.jsx';
import Services from './Page/Home/AllPage/Services.jsx';
import AboutUs from './Page/Home/AllPage/AboutUs.jsx';
import ContactUs from './Page/Home/AllPage/ContactUs.jsx';
import ContactUpdate from './components/ContactUpdate.jsx';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from './components/NotFoundPage.jsx'; // استيراد صفحة 404
import SliderPage from './Page/Slider/SliderPage.jsx';
import CreateSlider from './components/CreateSlider.jsx';
import EditSlider from './components/EditSlider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllPage />,
    children: [
      {
        index: true, // يجعل هذا التوجيه هو الافتراضي عند زيارة "/"
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "TheTeam",
        element: <TheTeam />,
      },
      {
        path: "Services",
        element: <Services />,
      },
      {
        path: "AboutUs",
        element: <AboutUs />,
      },
      {
        path: "ContactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: '/LogIn',
    element: <LogInPage />,
  },
  {
    path: '/SignUp',
    element: <SignUpPage />,
  },
  {
    path: '/Admin',
    element: <AdminPage />,
    children: [
      {
        path: 'Teams',
        element: <TeamsPage />,
      },
      {
        path: 'Services',
        element: <ServicePage />,
      },
      {
        path: 'CreateService',
        element: <CreateServicePage />,
      },
      {
        path: 'Contacts',
        element: <ContactPage />,
      },
      {
        path: 'Events',
        element: <EventPage />,
      },
      {
        path: 'CreateEvent',
        element: <CreateEventPage />,
      },
      {
        path: 'Event/:id',
        element: <EditEventPage />,
      },
      {
        path: 'Service/:id',
        element: <EditService />,
      },
      {
        path: 'ContactUpdate/:id',
        element: <ContactUpdate />,
      },
      {
        path: 'Clients',
        element: <ClientPage />,
      },
      {
        path: 'CreateClient',
        element: <CreatecCientPage />,
      },
      {
        path: 'Client/:id',
        element: <ClientDetailsEditPage />,
      },
      {
        path: 'Users',
        element: <UsersPage />,
      },
      {
        path: 'CreateTeam',
        element: <CreatTeamPage />,
      },
      {
        path: 'Slider',
        element: <SliderPage />,
      },
      {
        path: 'CreateSlider',
        element: <CreateSlider />,
      },
      {
        path: 'EditSlider/:id',
        element: <EditSlider />,
      },
      {
        path: 'Team/:id',
        element: <TeamDetailsPage />,
      },
      {
        path: 'CreateContact',
        element: <CreateContactPage />,
      }
    ],
  },
  {
    path: '*', // صفحة 404
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <ThemeProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);
