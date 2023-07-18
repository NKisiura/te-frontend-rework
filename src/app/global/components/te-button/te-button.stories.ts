import { Meta, StoryObj } from '@storybook/angular';
import { TeButtonComponent } from '@global/components/te-button/te-button.component';

const meta: Meta<TeButtonComponent> = {
  title: 'Components/Button',
  component: TeButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TeButtonComponent>;

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'primary',
    label: 'te-button',
    outline: false,
    isDisabled: false,
    enableAutofocus: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    ...Primary.args,
    color: 'success',
  },
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    color: 'danger',
  },
};

export const Warning: Story = {
  args: {
    ...Primary.args,
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    ...Primary.args,
    color: 'info',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    isDisabled: true,
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
  },
};
