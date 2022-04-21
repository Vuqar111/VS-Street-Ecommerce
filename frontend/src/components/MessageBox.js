import React from 'react';

export default function MessageBox(props) {
  return (
    <div className={`alert  text-[green] alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}
