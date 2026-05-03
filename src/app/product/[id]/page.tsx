
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // We 'await' the params to unwrap them before using them
  const { id } = await params;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        You are looking at Product #{id}
      </h1>
      <p className="text-gray-600">
        (We will put the real product details here soon!)
      </p>
    </main>
  );
}