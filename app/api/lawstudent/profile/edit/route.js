export async function PUT(req) {
  try {
    await DbConnect();

    const user = await getUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();

    const updatedLawstudent = await LawStudent.findOneAndUpdate(
      { _id: user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedLawstudent) {
      return NextResponse.json({ error: "Law student not found" }, { status: 404 });
    }

    const token = await generateToken(updatedLawyer);

    const response = NextResponse.json({ message: "Profile updated", lawyer: updatedLawstudent }, { status: 200 });

    response.cookies.set(setAuthCookie(token))

    return response;
  } catch (error) {
    console.error("Update law Student error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
