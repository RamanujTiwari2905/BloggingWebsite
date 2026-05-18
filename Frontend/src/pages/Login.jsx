export default function Login(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
    <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-white mb-2">
        Blogger
      </h2>
      <p className="text-center text-slate-400 mb-6">
        Login to your account
      </p>

      <form className="space-y-5">

        {/* Email */}
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input type="email"placeholder="john@example.com"
            className={`w-full mt-1 px-4 py-2 rounded-lg bg-slate-800 border 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white`}
            // {...register("emailId")}
            />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-slate-300">Password</label>

          <input
            type="password"
            placeholder="••••••••"
            className={`w-full mt-1 px-4 py-2 rounded-lg bg-slate-800 border 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white`}
            // {...register("password")}
          />

        </div>


        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg font-semibold text-white 
          bg-linear-to-r from-indigo-500 to-purple-600 
          hover:from-indigo-600 hover:to-purple-700 
          transition duration-200 shadow-lg">
            Login
        </button>

      </form>
    </div>
  </div>
    )
}