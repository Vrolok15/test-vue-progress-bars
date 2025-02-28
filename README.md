# Interactive Progress Bars

A Vue 3 application showcasing different styles of progress bars and charts with interactive controls.

Check it out here - https://test-vue-progress-bars.vercel.app/

## Features

- Multiple visualization styles:
  - Circle: Traditional circular progress indicator
  - Dashboard: Semi-circular gauge style
  - Bar: Horizontal progress bar with percentage display
  - Pie Chart: Interactive pie chart with customizable segments

### Progress Bar Features:
- Start/Stop/Clear controls
- Speed adjustment slider
- Manual percentage input
- Auto-restart toggle
- Warning and error states
- Shape switching with arrow controls
- Visual feedback through colors and icons
- Smooth transitions and animations

### Pie Chart Features:
- Add/remove segments dynamically
- Customize segment colors
- Adjust segment values
- Interactive segment selection
- Percentage display for each segment
- Smooth animations during value changes
- Total value validation

## Technical Details

Built with:
- Vue 3
- TypeScript
- CSS Variables for theming
- Material Icons for status indicators
- SVG-based visualizations

## Credits

I've used the following packages, thank you to the creators!

- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Material Icons](https://fonts.google.com/icons) - Google's Material Design Icons
- [vue-color-kit](https://vue-color-kit.vercel.app/) - Color Picker Component
- [vue3-toastify](https://vue3-toastify.js-bridge.com/) - Toast Notifications
- [Vite](https://vitejs.dev/) - Frontend Build Tool

## Usage

### Progress Bars
The progress bars can be:
- Started/stopped with the control buttons
- Adjusted in speed using the slider
- Set to specific percentages via input
- Switched between shapes using arrow controls
- Set to auto-restart when complete
- Triggered into warning or error states

### Pie Chart
The pie chart can be:
- Modified by adding or removing segments
- Customized with different colors per segment
- Updated with new values through direct input
- Interacted with by clicking segments
- Automatically validates total percentage (100%)

Each component operates independently and maintains its own state.
