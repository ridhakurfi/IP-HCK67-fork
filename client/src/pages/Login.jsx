export default function LogMe() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Please Login</span>
                    </label>
                    <div className="input-group">
                        <span>Email</span>
                        <input type="text" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="input-group">
                        <span>Password</span>
                        <input type="password" placeholder="Password" className="input input-bordered" />
                    </div>
                </div>
            </div>
        </>
    )
}