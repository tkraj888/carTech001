/* eslint-disable react/prop-types */

export function WinnerSectionImages({ ImageData }) {
  // console.log(ImageData);

  
  const coverImage = ImageData.object.find(item => item.documentType === "coverImage");

  if (!coverImage) {
    return (
      <div className="text-center mt-5">
        <img
          className="h-[14rem] w-[19rem] p-[20px] opacity-50"
          src="../../cars/no-image-available.png"
          alt="No image available"
        />
      </div>
    );
  }

  return (
    <img
      key={coverImage.documentId}
      src={coverImage.documentLink}
      alt={`Car Image ${coverImage.documentId}`}
      className="rounded-lg h-[15rem] w-[19rem]"
    />
  );
}
