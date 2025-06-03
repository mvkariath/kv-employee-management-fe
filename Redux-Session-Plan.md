1:45PM - 5:45PM (4 hours)

1:45 - 2:00PM (15 mins)

Pre-requisites

1. Link to old redux docs (for implementation)
   https://redux.js.org/tutorials/fundamentals/part-1-overview

2. Update the folder structure like below (There's a new folder called 'store' in the root of the project)

```bash
src/
├── api-service/
├── assets/
├── components/
├── hooks/
├── pages/
├── store/
│   ├── department/
│   │   └── departmentReducer.ts
│   └── employee/
│       ├── employee.types.ts
│       ├── employeeActions.ts
│       ├── employeeReducer.ts
│   ├── rootReducer.ts
│   └── store.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
```

3. Share the file with Employee type definitions ( without the action for create employee in it)
4. Install redux and react-redux packages in the project

2:00 - 2:30PM (30 mins) - Refresher Theory

1. Redux and the library analogy (10 mins)
   An interaction example ( from a react component sending an action to the redux store to state getting updated, and then reading the state from the redux store)

2. Three Core Principles of Redux (10 mins)

   - Single source of truth
   - State is read-only
   - Changes are made with pure functions

3. Redux Store Responsibilities (10 mins)
   - Holds the Application State
   - Allows Access to State
   - Allows State to be Updated via Dispatching Actions
   - Registers Listeners
   - Handles Unsubscribing Listeners

2:30 - 3:30PM (60 mins) - Code

Start Implementing store responsibilities one by one

`Syntax for creating a redux store, and adding a reducer` ( Theory ) (10 mins)

#### TASK 1: Create the redux store, Add a reducer for employee state management (30 mins)

#### TASK 2: Provide the react app access to the redux store, Create an employee from the UI and store it in the redux store (30 mins)

3:30 - 4:30PM (60 mins)
`Middleware` ( Theory ) (10 mins)

#### TASK 3: Improve Logging: Implement logger middleware to log the actions and the state changes in browser console (15 mins)

#### TASK 4(Optional): Improve Logging: Plug in Redux Dev Tools extension (15 mins)

#### TASK 5: The Employee list should be updated automatically when the employee is added to the redux store (30 mins)

4:30 - 5:30PM (60 mins) - Code

`Redux State Organization and Modularity` ( Theory) (10 mins)

#### TASK 6: How do we add one more reducer, say 'department' to the redux store? (30 mins)

#### TASK 7: Deleting an employee from the UI should remove it from the redux store (30 mins)

#### TASK 8: Show the details of an employee from the redux store in EmployeeDetails.tsx (30 mins)

#### TASK 9: Update an employee from the UI should update it in the redux store (30 mins)
