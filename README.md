# Overview

Make your dashboard more powerfull with qodly-grid-layout build by the react-grid-layout library. This component will allow users to create draggable, resizable, and responsive grid layouts for their web applications. The library is particularly useful for creating dashboards, grid-based UIs, or any application where users need to arrange components dynamically.

## Qodly-grid-layout

![gridLayout](https://github.com/metayoub/qodly-grid-layout/blob/develop/public/gridLayout.png)

### Properties

| Name                  | Type    | Default                               | Description                                                                                                                                                                     |
| --------------------- | ------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Filter Mode           | boolean | True                                  | If set to true, you'll have the ability to filter and display the cards you want                                                                                                |
| Save in local storage | boolean | False                                 | If set to true, instead of storing your layout in a datasoucre, it will be saved in the local storage, and will be displayed on the next render of your component               |     |
| Prevent collision     | boolean | True                                  | If set to true, dragging the cards defined inside the grid-layout will be disabled                                                                                              |
| Row height            | number  | 100                                   | This value defines the height of your grid                                                                                                                                      |
| Margin X              | number  | 10                                    | This is the right margin between the cards and the parent                                                                                                                       |
| Margin Y              | number  | 10                                    | This is the top margin between the cards and the parent                                                                                                                         |
| Cards                 | array   | One card by default with title Card_1 | This is the area where you will define how many cards will be displayed within the grid. You will have to give a unique name to each card's title in order for it to be visible |

### Datasource

| Name       | Type  | Required | Description                                                                                                                                                                                                |
| ---------- | ----- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datasource | Array | Depends  | Will contain the layout's array. If you use set the "save in local storage" property to true, you do not have to bind the layout with any datasource, else if set to false, you must bind it with a datasource of type array|

### Custom css

When it comes to customization, you can customize each card directly from the canva, and re-style the filter selectbox using css

These are the proposed classes within the component:

![gridLayout](https://github.com/metayoub/qodly-grid-layout/blob/develop/public/customGrid.png)
