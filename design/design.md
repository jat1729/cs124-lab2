# Lab 2 Design Document And Decisions

# Introduction
The creators of this to-do list app are Aditya Bhargava (HMC '23) and Joel Tan-Aristy (HMC '24). In this lab, 
we designed and implemented a to-do list using React and JavaScript. What makes our to-do list different
from other to-do lists is that we have an option for showing the tasks yet to complete, and we have folders to organize
our tasks.

## Tasks to Complete
Showing only uncompleted items was a difficult constraint as there is no standard icon or button for displaying
uncompleted items. We decided to keep the design simple and include text in a button. The different phrases we 
considered were "Show uncompleted items", "Tasks to Consider", "Unfinished tasks", and "Tasks to Complete." 
We conducted ten user tests to determine the phrase and eight out of the ten participants said that the phrase 
"Tasks to Complete" was the most intuitive expression for showing only uncompleted items. The flow of the tasks to
complete button can be found [here](taskstocomplete.md). Implementing the "Tasks to Complete" button and functionality
was quite difficult as we had to utilize a useState to keep track of the "Tasks to Complete" and "All Tasks" button .
Additionally, we had to pass the information to the Tasks component, so we hide the completed items.

## Delete All Completed Tasks
We implemented the button [here](taskstocomplete.md) so that users could permanently remove all their completed tasks. 
In order to do this, when the button is clicked we iterate through all our tasks, filtering out the tasks that have been marked 
completed. The 'delete all completed' button appeared obvious to the users during user testing, which is why we decided 
to keep the UI simple with just an icon and no text. Compared to the other features in the design, implementing the this 
button was straightforward. The general flow is [here](deleteAllTasks.md).

## Editing a Task/Folder Name
We decided that it would be best for the users to keep the UI for editing task and folder names consistent. We did this
by keeping the same edit button [here](editButton.png). The user would click on the edit button and the folder or task name would
convert to a form, allowing them to edit the name. In order to do this, we had to utilize a useState for when the edit 
button had been clicked, and if it had been clicked the task or folder description div would be replaced with a form.
We decided that when the form appears after the edit button is pressed, the current description for the task or folder 
should immediately be there. That way, if the users simply wanted to add or shorten their original description, they 
would not need to retype anything. We also decided to change the background color of the text during the edit mode, to 
alert the user that the specific text is still in edit mode.When the user is satisfied with their edits, they can 
repress the edit button and the changes would be saved. Additionally, if a task was marked completed, the user could 
still edit its description and the task would stay completed. The flow to editing tasks can be seen [here](editTask.md).

## Adding a New Task
Our first design of adding a new task required us to enter a new window where we choose between adding a new folder
and a new task once we click the plus sign at the bottom of the app. We found this to be inconvenient to the user and
quite hard to implement as we had to create three more component and three more CSS files. 
Our old design can be found [here](oldaddtask.md). Our design now has a plus button near the folder name which adds a 
new task to the specified folder. The flow of adding a new task can be found [here](newaddtask.md). 
In future labs, we hope to make the new task editable so the user can instantly edit their new folder, 
so they don't have to click the edit button when they want to rename their new folder. Implementing this function was 
somewhat straightforward as we used a nested mapping function and spread syntax to append a task to the `tasks` array 
in the folder element. 

## Expanding and Collapsing a Folder
The part of the design that we are most proud of are the dropdown icons as it lets users retract folders that they are 
not using. We initially were considering to have the up and down chevron icon but after consulting with Prof. Rhodes we 
decided to utilize the right and down [chevron icon](upvsdown.md). The flow of the expanding and collapsing a folder can 
be found [here](expandingandcollapsing.md). After completing user testing, we noticed that nine out of the ten users 
easily understood the function of the Chevrons and was able to expand the task without any instructions. Whenever a user 
added too many tasks or folders to be seen all at once, we implemented the scrolling feature so that the user can adjust 
to see the desired folders or tasks. We considered also making the taskbar and 'new folder' button also included in the 
scroll. Ultimately we determined that if the user adds a significant amount of tasks or folders, the 'delete all 
completed tasks,' 'task to complete,' and 'new folders' buttons would be too difficult to access considering how 
important they are. So we decided on keeping the taskbar and bottom bar (which contains the 'new folder' button) 
un-scrollable and always visible to the user. We also decided on getting rid of the scrollbar. Upon user testing, 
we determined that the scroll functionality was obvious and unnecessary. Additionally, the scroll bar would cause bugs 
in the Chrome browser. The flow can be seen [here](scrollbar.md).

## Marking a Task Complete
We believe the line through the task is standard convention for marking items complete. Alternative designs were 
including a checkmark next to the completed item, and completely removing the item from the to-do list. The drawbacks 
of including a checkmark next to the completed item was that the use of numerous buttons next to the task would be 
confusing and distracting. Additionally, completely removing the item would not allow users to revert their change as 
they may have realized that their task is not actually complete. From our ten user tests, four users that the thickness 
of the line was too bold, so we decided to reduce the `text-decoration-thickness` from 3px to 2px. The difference can 
be seen [here](linethrough.md). One challenge we faced when implementing the action of marking an item complete was 
having to traverse every folder and every task in the folder. To overcome this obstacle, we used a general `setTaskProperty` 
function which set the `completed` attribute to the opposite of its current attribute. In this general `setTaskProperty`
function, we utilized a nested mapping and the spread syntax to "alter" a given attribute. The flow of marking a task
complete can be found [here](markingataskcomplete.md). 

## Adding a New Folder
Our first design of adding a new folder required us to enter a new window where we choose between adding a new folder
and a new task once we click the plus sign at the bottom of the app. We found this to be inconvenient to the user and
quite hard to implement as we had to create three new components and three CSS files. Our old design can be found 
[here](oldaddfodler.md). Our design now has a New Folder button which adds a new folder to the bottom of the to do list 
with the name "New Folder". The flow of adding a new folder can be found [here](newaddfolder.md). In future labs, we hope to make the new folder editable so the user can instantly edit their new folder, so they don't 
have to click the edit button when they want to rename their new folder. Nine out of the ten users agreed with this claim as we noticed that nine users attempted to edit the name of the
new folder by going straight to the title of the folder.  

## Difficulties
### Iterating through Tasks
Because we had folders, our data was stored in a list which contained folders as elements, and each folder contained a 
list of its corresponding task. Because we had features like deleting all completed tasks, we needed to iterate through 
every task in the list. This was rather difficult at first, because the spread syntax was unfamiliar to both of us. 
Thus, we were originally unsure on how we would iterate through our list of lists, which was required for multiple 
features.

### Editing Tasks and Folder Descriptions
Our approach to achieve this was when the edit button was clicked, convert the corresponding text to a form. When the 
form was submitted, store the input as the new folder or task description. This caused a lot of difficulty, as we were 
unsure whether to use state or simply props. This was due to the fact that when a folder or task was edited, we wanted 
the starting text or value of the form to be the original description of the task or folder. Thus, we experienced
difficulty on how to present the current description of the item being edited. 

### Retrieving icons and aligning them in a button
We found searching for checkmark, trash can, notepad, and plus icons to be quite difficult as we had to upload and 
resize the images from Safari. Additionally, we faced the obstacle of matching the color of the icons with our background
colors. Luckily, we were able to find a productive alternative: utilize icons from 
[Font Awesome](https://fontawesome.com/icons) by adding a source in our html code and incorporating the
already established icons. Once we retrieved the icons, we had align the icons with our button using padding and text 
align.

### Color and Font
We decided to use the "Clean and Energetic" color palette from 
[Dr. Milburn's color palettes](https://visme.co/blog/website-color-schemes/)
as we want our to-do list to be refreshing, positive, and peaceful. We attempted to use a purple background for the
[buttons](purple.md) but five of the users from the user tests said that they would prefer the buttons to be subtle 
(no change in color or no solid background). To complement the positive and energetic notion, we decided to use the 
font Arial, sans-serif with the color of text and buttons being black. 
Our original font was [Verdana, sans-serif](verdana.md) but six users said they would prefer another font to 
maintain our goal of making a to-do list that is clean and energetic.




