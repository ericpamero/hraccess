import React from 'react'

export const FileUpload = () => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white">
      <label className="block text-sm font-medium mb-2">Upload PDF or Image</label>
      <input type="file" accept=".pdf,image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2
                   file:px-4 file:rounded-full file:border-0 file:text-sm
                   file:font-semibold file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"/>
    </div>
  )
}
