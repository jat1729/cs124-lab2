# Lab 1 Design Document
## Marking Items Complete
We believe the line through the task is standard convention for marking items complete.
Alternative designs were including a checkmark next to the completed item, and completely removing the
item from the to-do list. The drawbacks of including a checkmark next to the completed item was that the
use of numerous buttons next to the task would be confusing and distracting. Additionally, completely removing
the item would not allow users to revert their change as they may have realized that their task is not actually complete.
We conducted one user test for making items complete. The user stated that the thickness of the line was too bold,
so we decided to reduce the `text-decoration-thickness` from 3px to 2px. The difference can be seen [here](linethrough.md). 
One challenge we faced was indicating that a task has been completed in the html code. 
We overcame this obstacle by adding a "completed" class to every item and then decorating the task accordingly in the 
`main.css` file.

## Renaming Items
We believe the "pencil/notepad" icon is standard convention for renaming items.
Alternative designs were not including an icon and just making the item editable when you click the task. 
The drawbacks of this design is that users who accidentally click the task item may edit their task and this is not 
ideal for their experience. We hope to expand this idea to JavaScript and React as hard coding text in HTML is not efficient
and consistent with clean code. 

## Show only uncompleted items
Showing only uncompleted items was a difficult constraint as there is no standard icon or button for displaying 
uncompleted items. We decided to keep the design simple and include text in a button. The different phrases we considered
were "Show uncompleted items", "Tasks to Consider", and "Unfinished tasks". We conducted five user tests to determine
the phrase and four out of the five participants said that the phrase "Unfinished tasks" was the most intuitive expression
for showing only uncompleted items. The part of the design that we are most proud of are the dropdown icons as it lets 
users retract categories/folders that they are not using. We initially were considering to have the up and down chevron icon
but after consulting with Prof. Rhodes we decided to utilize the right and down [chevron icon](upvsdown.md). Additionally, 
we decided to position the tasks to complete at the top of the to-do list so the user knows it's an option everytime 
they visit their list.

## Deleting all completed items
We believe the trash can is standard convention for deleting items (used on macOS). One challenge we faced was
determining the location of the trash icon bin. We initially wanted to place it at the end of the list so users can "toss"
out their tasks once they finish but we decided to relocate the icon to the top so we can maintain symmetry in the task bar.
Additionally, a symmetric taskbar gives our to-do list an orderly look and organized perspective. 

## Difficulties
1. Retrieving icons and aligning them in a button
2. s
3. 


## Color and Font
We decided to use the "Clean and Energetic" color palette from [Dr. Milburn's color palettes](https://visme.co/blog/website-color-schemes/)
as we want our to-do list to be refreshing, positive, and peaceful. We attempted to use a purple background for the 
[buttons](purple.md) but five of the users from the user tests said that they would prefer the buttons to be subtle (no change in color 
or no solid background). To complement the positive and energetic notion, we decided to use the font Arial, sans-serif 
with the color of text and buttons being black. Our original font was [Verdana, sans-serif](verdana.md) but multiple users
said they would prefer another font to maintain our goal of making a to-do list that is clean and energetic. 



