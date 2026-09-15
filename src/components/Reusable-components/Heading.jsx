import React from 'react'

const Heading = ({ h }) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {h}
      </h2>
    </div>
  )
}

export default Heading